export const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '46px', // Set this to match the height of your other input fields
      height: '46px',    // Ensure the overall height is consistent
      backgroundColor: state.isFocused ? 'white' : '#E2E8F0', // bg-slate-200 color code
    borderColor: state.isFocused ? '#3182CE' : provided.borderColor, // Optional: Change border color on focus
    boxShadow: state.isFocused ? '0 0 0 1px #3182CE' : provided.boxShadow, // Optional: Add shadow on focus
    '&:hover': {
      borderColor: state.isFocused ? '#3182CE' : provided.borderColor, // Optional: Change border color on hover
    },
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: '46px', // Adjust the height of the value container
      padding: '0 6px', // Adjust padding if necessary
    }),
    input: (provided) => ({
      ...provided,
      margin: '0px', // Remove margin if present
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: '46px', // Adjust the height of the indicators container
    }),
  };
  