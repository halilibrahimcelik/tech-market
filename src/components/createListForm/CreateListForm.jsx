import React from "react";

const CreateListForm = ({ handleSubmit, onMutate }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <div>
            <button type="button" id="type" value={"sale"} onClick={onMutate}>
              Phone
            </button>
          </div>
        </label>
      </form>
    </>
  );
};

export default CreateListForm;
