'use client';
import { Link } from '@chakra-ui/next-js';
import { Box, BoxProps, Button, Flex, FormControl, FormLabel, Heading, Tag, Text, useToast } from '@chakra-ui/react';
import { JSONData, transformImage } from '@xata.io/client';
import { motion } from 'framer-motion';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { ImageRecord, TagRecord } from '@/utils/xata';
import { Search } from '../search';
import { ImageUpload } from './upload';

// Because we serialized our data with .toSerializabe() server side,
// we need to cast it back to the original type as JSON Data
// Xata provides JSONData<T> for this purpose
interface ImageProps {
  image: JSONData<ImageRecord>;
  tags: JSONData<TagRecord>[];
  readOnly: boolean;
}

export const Image: FC<ImageProps> = ({ image, tags, readOnly }) => {
  const router = useRouter();
  const toast = useToast();
  const handleDelete = async () => {
    const response = await fetch(`/api/images/${image.id}`, { method: 'DELETE' });
    if (response.status === 200) {
      router.refresh();
      router.push('/');
      toast({
        title: 'Image deleted',
        description: `Image ${image.name} has been deleted`,
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    }
  };

  if (!image.name) return null;

  // Xata provides a helper to transform images on the client side. It works the same
  // as the server side helper, but will perform after the page render so you might want
  // to add a transition to account for the slight delay.
  //
  // A good usage of client side transformation might be to dynamically make
  // images sizes based on viewport


  // We use framer motion to animate the client side image on page load
  type MotionBoxProps = Omit<BoxProps, 'transition'>;
  const MotionBox = motion<MotionBoxProps>(Box);

  return (
    <>
  
      <Flex alignItems="center" justifyContent="space-between" mb={8} w="full">
        <ImageUpload readOnly={readOnly} />
        <Search />
      </Flex>
      <Heading as="h1" size="md" mb={8}>
        {image.name}
      </Heading>
      <Flex mb={8} gap={2} wrap="wrap">
        <Link href="/dashboard/home">&laquo; Back to all images</Link>
      </Flex>
      <Flex alignItems="start" flexGrow={1} gap={12} flexDir={{ base: 'column', lg: 'row' }}>
        <Flex alignItems="center" justifyContent="center" flexDir="column" grow={1} w="full">
        <Box boxShadow="lg" maxW="full" borderRadius="md" overflow="hidden">
            <NextImage
              src={image.name ?? ''}
              width={600}
              height={300}
              alt={image.name ?? ''}
            />
          </Box>
        </Flex>
        <Flex
          flexDir="column"
          gap={6}
          maxW={{ base: 'full', lg: 300 }}
          bg="contrastLowest"
          p={8}
          borderRadius="md"
          w="full"
          boxShadow="lg"
        >
          <FormControl>
            <FormLabel>Image name</FormLabel>
            <Text fontSize="sm">{image.name}</Text>
          </FormControl>
          <FormControl>
            <FormLabel>Original image URL</FormLabel>
           
           
          </FormControl>
          <FormControl>
            <FormLabel>Original width</FormLabel>

          </FormControl>
          <FormControl>
            <FormLabel>Original height</FormLabel>

          </FormControl>
          {tags.length > 0 && (
            <FormControl>
              <FormLabel>Tagged as</FormLabel>
              <Flex gap={2}>
                {tags?.map((tag) => (
                  <Tag as={NextLink} key={tag.id} href={`/tags/${tag.id}`}>
                    {tag.name}
                  </Tag>
                ))}
              </Flex>
            </FormControl>
          )}
          {!readOnly && (
            <Box>
              <Button colorScheme="red" size="sm" onClick={handleDelete}>
                Delete
              </Button>
            </Box>
          )}
        </Flex>
      </Flex>
    </>
  );
};
