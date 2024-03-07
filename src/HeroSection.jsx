import React, { useEffect, useState } from "react";
import { supaBase } from "./supaBaseClient.js"
import toast from "react-hot-toast";
function HeroSection() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const { data, error } = await supaBase
          .from("research")
          .select("*")
          .limit(10);
        if (error)
        {
          throw error;
          toast(error.message || "An error occured")
        }

        if (data != null) {
         
          setProduct(data);
        }
      } catch (error) {
        console.error(error)
      }
    }
    getProducts();
    
  }, [product]);

  return (
    <div className=" w-screen flex flex-col justify-center m-10  overflow-hidden px-5 ">
      <h1 className="flex text-5xl items-start w-full px-5">Hello Dr GRK! Have a Nice Day</h1>

      <div className="flex flex-col justify-start h-max mt-5 px-5">
        <h1 className="text-xl">Current Research Interest</h1>

        <div className="flex flex-row gap-10 mt-5 w-auto overflow-x-scroll p-20">
          <AddCard />
          {product?.map((val, index) => (

            <DisplayCard
              Mtitle={val.title}
              id = {val.id}
              key={index}
              description={val.description}
              product={product}
            />
          ))}
        </div>
      </div>

      <div className="w-full justify-start flex flex-col">
        <h1 className="text-xl">Research</h1>
      </div>
      <div className="w-full justify-start flex flex-col">
        <h1 className="text-xl">Training</h1>
      </div>
      <div className="w-full justify-start flex flex-col">
        <h1 className="text-xl">Students</h1>
      </div>
      <div className="w-full justify-start flex flex-col">
        <h1 className="text-xl">Publication</h1>
      </div>
      <div className="w-full justify-start flex flex-col">
        <h1 className="text-xl">Recent Activities</h1>
      </div>
    </div>
  );
}

function DisplayCard({ Mtitle, description, product, id }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(Mtitle);
  const [desc, setDesc] = useState(description);
  const handleEditClick = () => {
    setEditing(!editing);
  };

  async function deleteCard() {
    try {
      const { data, error } = await supaBase
        .from("research")
        .delete()
        .eq("id", id);


  
      window.location.reload()
      if (error)
      {
        toast.error(error.message || "An error occured during deletion")
        throw error;
      } 
      else{
        toast.success("Deletion done")
      }

    } catch (error) {
      alert(error.message);
    }
  }

  async function editCard() {
    try {
      const { data, error } = await supaBase
        .from("research")
        .update({
          title: title,
          description: desc,
        })
        .eq("id", id);

      window.location.reload()
      if (error)
      {
        toast.error(error.message || "An error occured during deletion")
        throw error;
      } 
      else{
        toast.success("Modification done")
      }

    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="w-fit border flex flex-col p-10 space-y-5">
      {editing === true ? (
        <div className="space-y-5 px-20 text-nowrap flex flex-col">
          <p>Enter the title of the field</p>
          <input
            className="w-full h-10 bg-gray-300 text-left px-4"
            type="text"
            placeholder="Title.."
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <p>Enter the Description of the current field</p>
          <input
            className="w-full h-10 bg-gray-300 text-left px-4"
            placeholder="Description.."
            defaultValue={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button
            className="border bg-transparent h-10"
            onClick={() => editCard()}
          >
            Submit
          </button>
        </div>
      ) : (
        <>
          <p>{Mtitle} </p>
          <p>{description} </p>
          <div className="flex flex-row gap-10 w-full ">
            <button
              className="border bg-transparent h-10 w-20"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className="border bg-transparent h-10 w-20"
              onClick={() => {
                deleteCard();
              }}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function AddCard() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [add, setAdd] = useState(0);
  const handleAdd = () => {
    setAdd(!add);
  };

  async function CreateRow() {
    console.log("this function is rendering");
    try {
      console.log("this function is rendering");
      const { data, error } = await supaBase
        .from("research")
        .insert({
          title: title,
          description: desc,
        })
        .single();
      window.location.reload();
      if (error)
      {
        toast.error(error.message || "An error occured during deletion")
        throw error;
      } 
      else{
        toast.success("Insertion done")
      }
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div className="w-full border flex flex-col p-10 space-y-5 justify-center items-center ">
      {add ? (
        <div className="space-y-5 px-20 text-nowrap flex flex-col">
          <p>Enter the title of the field</p>
          <input
            className="w-full h-10 bg-gray-300 text-left px-4"
            type="text"
            placeholder="Title.."
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <p>Enter the Description of the current field</p>
          <input
            className="w-full h-10 bg-gray-300 text-left px-4"
            placeholder="Description.."
            defaultValue={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button
            className="border bg-transparent h-10 w-full items-center"
            onClick={() => {
              CreateRow();
            }}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center p-20">
          <button
            className="w-10 h-10 rounded-full bg-gray-300 text-4xl border items-center "
            onClick={handleAdd}
          >
            {" "}
            +{" "}
          </button>
        </div>
      )}
    </div>
  );
}


export default HeroSection;
