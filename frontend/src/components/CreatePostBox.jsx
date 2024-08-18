import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function CreatePostBox({ openModal, setOpenModal }) {
  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        dismissible
      >
        <Modal.Body>
          <div className="flex flex-col justify-center">
            <p className="mt-4 text-md text-gray-800 text-center">
              Create New Post
            </p>
            <hr className="border-gray-300 mb-5" />
            <Button color={"blue"}>Select from computer</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
