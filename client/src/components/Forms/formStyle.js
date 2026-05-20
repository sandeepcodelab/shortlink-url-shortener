const formStyle = {
  mt: 3,

  // Input text color
  "& .MuiInputBase-input": {
    color: "#fff",
  },

  // Label default
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.6)",
  },

  // Label error
  "& .MuiInputLabel-root.Mui-error": {
    color: "#d32f2f",
  },

  // Label on focus
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#38bdf8",
  },

  // Outlined border default
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.4)",
  },

  // Outlined border error
  "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
    borderColor: "#d32f2f",
  },

  // Hover border
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.6)",
  },

  //   Hover border error
  "& .MuiOutlinedInput-root.Mui-error:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "#f44336",
    },

  // Focus border
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#38bdf8",
  },

  // Focus border with error
  "& .MuiOutlinedInput-root.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "#38bdf8",
    },
};

export { formStyle };
