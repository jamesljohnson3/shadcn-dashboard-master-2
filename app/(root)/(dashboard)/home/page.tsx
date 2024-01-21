import { compact, pick } from 'lodash';
import { Images, TagWithImageCount } from '@/components/images';
import { IMAGES_PER_PAGE_COUNT, IMAGE_SIZE } from '@/utils/constants';
import { getXataClient } from '@/utils/xata';
import { useAuth } from "@clerk/nextjs";
const xata = getXataClient();

const getImageCount = async () => {
  const totalNumberOfImages = await xata.db.image.summarize({
    columns: [],
    summaries: {
      count: { count: '*' }
    }
  });
  return totalNumberOfImages.summaries[0].count;
};

export default async function Page({ searchParams }: { searchParams: { page: string } }) {
  const pageNumber = parseInt(searchParams.page) || 1;

  let imageUrl: string | undefined; // Declare imageUrl with an initial value

  const imagesPagePromise = xata.db.image.sort('xata.createdAt', 'desc').getPaginated({
    pagination: { size: IMAGES_PER_PAGE_COUNT, offset: IMAGES_PER_PAGE_COUNT * pageNumber - IMAGES_PER_PAGE_COUNT }
  });

  const imageCountPromise = getImageCount();

  const topTagsPromise = xata.db['tag-to-image'].summarize({
    columns: ['tag'],
    summaries: {
      imageCount: { count: '*' }
    },
    sort: [
      {
        imageCount: 'desc'
      }
    ],
    pagination: {
      size: 10
    }
  });

  console.time('Fetching images');
  const [imagesPage, imageCount, topTags] = await Promise.all([imagesPagePromise, imageCountPromise, topTagsPromise]);
  console.timeEnd('Fetching images');

  const totalNumberOfPages = Math.ceil(imageCount / IMAGES_PER_PAGE_COUNT);

  const page = {
    pageNumber,
    hasNextPage: imagesPage.hasNextPage(),
    hasPreviousPage: pageNumber > 1,
    totalNumberOfPages
  };

  console.time('Fetching images transforms');
  const images = compact(
    await Promise.all(
      imagesPage.records.map(async (record) => {
        if (!record.image) {
          return undefined;
        }

        try {
          const imageData = JSON.parse(record.image);
          imageUrl = imageData.image;
        } catch (error) {
          console.error('Error parsing image data:', error);
          return undefined;
        }

        if (!imageUrl) {
          return undefined;
        }

        const thumb = {
          url: imageUrl,
          attributes: {
            width: IMAGE_SIZE,
            height: IMAGE_SIZE
          }
        };

        return { ...record.toSerializable(), thumb, imageUrl };
      })
    )
  );
  console.timeEnd('Fetching images transforms');

  const tags = topTags.summaries.map((tagSummary) => {
    const tag = tagSummary.tag;
    const serializableTag = pick(tag, ['id', 'name', 'slug']);
    return {
      ...serializableTag,
      imageCount: tagSummary.imageCount
    };
  }) as TagWithImageCount[];

  const { isSignedIn } = useAuth();

const readOnlyValue = !isSignedIn;

return <Images images={images} imageUrl={imageUrl} tags={tags} page={page} readOnly={readOnlyValue} />;

}