import React from "react";

export default function RenderError(props) {
  const { errors } = props;
  return (
    <div>
      {Object.keys(errors).length > 0 && (
        <div className="text-red-500">
          <p>{Object.values(errors)[0]}</p>
        </div>
      )}
    </div>
  );
}
