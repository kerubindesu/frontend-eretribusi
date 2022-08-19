import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { Button, Heading, TabTitle } from "../../UI/atoms";
import { FloatingLabel } from "../../UI/molecules";
import { saveRetribution } from "../../../features/retributions/retributionsActions";

const PostRetribution = () => {
  TabTitle("Tambah Retribusi");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(saveRetribution({ name, address }));
      navigate("/retributions");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <div className="mb-8 flex items-center gap-4">
          <Link to="/retributions">
            <BiArrowBack />
          </Link>
          <Heading text={document.title} variant={"text-start"} />
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-flow-row-dense grid-cols-3 grid-rows-1 gap-4"
        >
          <div className="col-span-3 sm:col-span-2">
            <div className="grid sm:grid-cols-2 gap-x-4">
              <FloatingLabel
                type={"text"}
                id={"name"}
                value={name}
                htmlFor={"name"}
                text={"Nama lengkap"}
                onChange={(e) => setName(e.target.value)}
              />
              <FloatingLabel
                type={"text"}
                id={"address"}
                value={address}
                htmlFor={"address"}
                text={"Alamat"}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-x-4">
              <Button
                type={"submit"}
                variant={"bg-sky-400 hover:bg-sky-500 text-white"}
                text={"Simpan"}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PostRetribution;
