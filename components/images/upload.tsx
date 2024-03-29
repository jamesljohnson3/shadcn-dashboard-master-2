'use client';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FC, FormEvent, useState } from 'react';

interface ImageUploadProps {
  readOnly: boolean;
}

export const ImageUpload: FC<ImageUploadProps> = ({ readOnly }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!file || !name || !tags) {
      setMessage('Name, file and tags are required.');
      return;
    }

    // Grab the form data
    const formData = new FormData();
    const fileObj = file as File;
    formData.append('fileType', fileObj.type);
    formData.append('name', name);
    formData.append('tags', tags);

    try {
      // This route creates new image and tag records in Xata
      // If you look at the api route code, you'll see that we're not actually
      // uploading the image here. Instead, we're creating a record in the database
      // with a temporary, empty image. We do this because we need to generate a
      // pre-signed URL for the image upload.
      const response = await fetch('/api/images', {
        method: 'POST',
        body: formData
      });
      if (response.status !== 200) {
        throw new Error("Couldn't create image record");
      }

      const record = await response.json();

      // The response include a pre-signed uploadUrl on the record. Below, we then send a file
      // directly to Xata on the client side using the PUT request. This lets us upload
      // large files that would otherwise exceed the limit for serverless functions on
      // services like Vercel.

      if (response.status === 200) {
        setIsUploading(true);
        try {
          setIsUploading(true);
          await fetch(record.image.uploadUrl, { method: 'PUT', body: file });
          toast({
            title: 'Image uploaded.',
            description: 'Your image was uploaded successfully.',
            status: 'success',
            duration: 5000,
            isClosable: true
          });
          setIsUploading(false);
          router.push(`/images/${record.id}`);
        } catch (error) {
          // Delete the record and associated tag
          await fetch(`/api/images/${record.id}`, { method: 'DELETE' });
          setIsUploading(false);
          throw new Error("Couldn't upload image");
        }
      } else {
        throw new Error("Couldn't upload image");
      }
    } catch (error) {
      setMessage('An error occurred while uploading the image.');
    }
  };

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  if (readOnly) {
    return (
      <Box>
        <Button
          as="a"
          href="https://github.com/xataio/sample-nextjs-chakra-gallery-app"
          colorScheme="primary"
        >
          Source on GitHub
        </Button>
        <Text mt={4} fontSize="xs" color="textSubtle">
          This demo set to read only mode.{' '}
          <Link href="https://github.com/xataio/sample-nextjs-chakra-gallery-app/">Run it locally</Link> to explore the
          full functionality.
        </Text>
      </Box>
    );
  }

  return (
    <>
      <Button colorScheme="primary" onClick={onOpen}>
        Add image
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(12px)" bg="blackAlpha.600" />
        <ModalContent boxShadow="outline">
          <form onSubmit={handleSubmit}>
            <ModalHeader>Add an image</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex flexDir="column" gap={4}>
                <FormControl id="name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </FormControl>
                <FormControl id="name" isRequired>
                  <FormLabel>Tags</FormLabel>
                  <Input type="text" name="name" value={tags} onChange={(e) => setTags(e.target.value)} />
                </FormControl>
                <FormControl id="file" isRequired>
                  <FormLabel>Image</FormLabel>
                  <Input type="file" name="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
                </FormControl>
              </Flex>
              {isUploading && <Progress size="xs" isIndeterminate colorScheme="primary" mt={4} />}
              {message && <div>{message}</div>}
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="primary">
                Upload
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
