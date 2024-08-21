import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";

export function DialogBox({ openModal, setOpenModal, post }) {
  const { currentUser } = useSelector((state) => state.user);
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
          <div className="text-center">
            <p className="my-5 text-md  text-red-800">Report</p>
            <hr className="border-gray-300 mb-5" />
            <p className="mb-5 text-md  text-red-800">Unfollow</p>
            <hr className="border-gray-300 mb-5" />
            <p className="mb-5 text-md  text-gray-800">Add to favourites</p>
            <hr className="border-gray-300 mb-5" />

            {currentUser.user._id === post.author._id && (
              <>
                <p className="mb-5 text-md  text-gray-800">
                  {currentUser.user._id === post.author._id && "Delete Post"}
                </p>
                <hr className="border-gray-300 mb-5" />{" "}
              </>
            )}
            <p
              className=" text-md text-gray-800"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
