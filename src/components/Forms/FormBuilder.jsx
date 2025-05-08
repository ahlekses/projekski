import { useState } from "react";


export default function FormBuilder() {
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [sections, setSections] = useState([
    { name: "Section 1", form_fields: [{ label: "", field_type: "text", choices: [] }] }
  ]);
  const [currentTab, setCurrentTab] = useState("builder"); // "builder" or "preview"

  const handleAddSection = () => {
    setSections([...sections, { name: `Section ${sections.length + 1}`, form_fields: [] }]);
  };

  const handleDeleteSection = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections.splice(sectionIndex, 1);
    setSections(updatedSections);
  };

  const handleSectionNameChange = (e, sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].name = e.target.value;
    setSections(updatedSections);
  };

  const handleFieldChange = (e, sectionIndex, fieldIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].form_fields[fieldIndex][e.target.name] = e.target.value;
    setSections(updatedSections);
  };

  const handleAddField = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].form_fields.push({
      label: "",
      field_type: "text",
      choices: []
    });
    setSections(updatedSections);
  };

  const handleDeleteField = (sectionIndex, fieldIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].form_fields.splice(fieldIndex, 1);
    setSections(updatedSections);
  };

  const handleAddOption = (sectionIndex, fieldIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].form_fields[fieldIndex].choices.push({ choice_text: "" });
    setSections(updatedSections);
  };

  const handleOptionChange = (e, sectionIndex, fieldIndex, optionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].form_fields[fieldIndex].choices[optionIndex] = {
      choice_text: e.target.value
    };
    setSections(updatedSections);
  };

  const handleDeleteOption = (sectionIndex, fieldIndex, optionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].form_fields[fieldIndex].choices.splice(optionIndex, 1);
    setSections(updatedSections);
  };

  const handleSubmit = () => {
    const formData = {
      title: formName,
      description: formDescription,
      sections
    };
    
    // Use your API service
    formsService.create(formData)
      .then(() => {
        // Refresh the forms list
        fetchItems();
        // Close the modal
        handleCloseModal();
      })
      .catch(err => {
        console.error('Failed to create form:', err);
        // Handle error (show error message, etc.)
      });
  };

  const fieldTypes = ["text", "password", "radio", "checkbox", "select", "textarea", "date", "email"];

  return (
    <div className="flex flex-col bg-gray-900 text-white rounded-lg w-full max-w-4xl mx-auto my-4 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 px-6 py-4 border-b border-gray-700 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Create Form</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => setCurrentTab("builder")}
            className={`px-4 py-2 rounded-md ${currentTab === "builder" ? "bg-blue-600" : "bg-gray-700"}`}
          >
            Builder
          </button>
          <button 
            onClick={() => setCurrentTab("preview")}
            className={`px-4 py-2 rounded-md ${currentTab === "preview" ? "bg-blue-600" : "bg-gray-700"}`}
          >
            Preview
          </button>
        </div>
      </div>
      
      {currentTab === "builder" ? (
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Form Name
              </label>
              <input
                className="bg-gray-800 border border-gray-700 text-white rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Enter form name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Description
              </label>
              <input
                className="bg-gray-800 border border-gray-700 text-white rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Enter form description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
              />
            </div>
          </div>

          {sections.map((section, sectionIndex) => (
            <div 
              key={sectionIndex} 
              className="mb-6 border border-gray-700 rounded-lg p-4 bg-gray-800"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">
                  {section.name || `Section ${sectionIndex + 1}`}
                </h3>
                <button
                  type="button"
                  onClick={() => handleDeleteSection(sectionIndex)}
                  className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md text-sm"
                >
                  Delete Section
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Section Name
                </label>
                <input
                  className="bg-gray-700 border border-gray-600 text-white rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Enter section name"
                  value={section.name}
                  onChange={(e) => handleSectionNameChange(e, sectionIndex)}
                />
              </div>

              {section.form_fields.map((field, fieldIndex) => (
                <div 
                  key={fieldIndex} 
                  className="mb-4 border border-gray-700 rounded-lg p-4 bg-gray-700"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Field Label
                      </label>
                      <input
                        className="bg-gray-600 border border-gray-500 text-white rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        name="label"
                        placeholder="Enter field label"
                        value={field.label}
                        onChange={(e) => handleFieldChange(e, sectionIndex, fieldIndex)}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Field Type
                      </label>
                      <select
                        className="bg-gray-600 border border-gray-500 text-white rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="field_type"
                        value={field.field_type}
                        onChange={(e) => handleFieldChange(e, sectionIndex, fieldIndex)}
                      >
                        {fieldTypes.map((type) => (
                          <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {["radio", "checkbox", "select"].includes(field.field_type) && (
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-gray-300 text-sm font-medium">
                          Options
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddOption(sectionIndex, fieldIndex)}
                          className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-md text-sm"
                        >
                          Add Option
                        </button>
                      </div>

                      {field.choices.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center mb-2">
                          <input
                            className="bg-gray-600 border border-gray-500 text-white rounded-md w-full py-2 px-3 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option.choice_text}
                            onChange={(e) => handleOptionChange(e, sectionIndex, fieldIndex, optionIndex)}
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteOption(sectionIndex, fieldIndex, optionIndex)}
                            className="bg-red-600 hover:bg-red-700 text-white p-1 rounded-md"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-end mt-3">
                    <button
                      type="button"
                      onClick={() => handleDeleteField(sectionIndex, fieldIndex)}
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md text-sm"
                    >
                      Delete Field
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => handleAddField(sectionIndex)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm"
              >
                Add Field
              </button>
            </div>
          ))}

          <div className="flex justify-between pt-4 border-t border-gray-700 mt-6">
            <button
              type="button"
              onClick={handleAddSection}
              
            >
              Add Section
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
            >
              Create Form
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 max-h-[70vh] overflow-y-auto bg-gray-100 text-gray-800">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">{formName || "Form Preview"}</h2>
            <p className="text-gray-600 mb-6">{formDescription || "No description provided"}</p>
            
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-8">
                <h3 className="text-xl font-semibold border-b pb-2 mb-4">{section.name}</h3>
                
                {section.form_fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      {field.label || `Field ${fieldIndex + 1}`}
                    </label>
                    
                    {field.field_type === "text" && (
                      <input type="text" className="border border-gray-300 p-2 w-full rounded-md" placeholder={`Enter ${field.label}`} />
                    )}
                    
                    {field.field_type === "password" && (
                      <input type="password" className="border border-gray-300 p-2 w-full rounded-md" placeholder="Enter password" />
                    )}
                    
                    {field.field_type === "email" && (
                      <input type="email" className="border border-gray-300 p-2 w-full rounded-md" placeholder="Enter email" />
                    )}
                    
                    {field.field_type === "date" && (
                      <input type="date" className="border border-gray-300 p-2 w-full rounded-md" />
                    )}
                    
                    {field.field_type === "textarea" && (
                      <textarea className="border border-gray-300 p-2 w-full rounded-md" rows="3" placeholder={`Enter ${field.label}`}></textarea>
                    )}
                    
                    {field.field_type === "radio" && field.choices.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center mt-1">
                        <input 
                          type="radio" 
                          id={`radio-${sectionIndex}-${fieldIndex}-${optionIndex}`} 
                          name={`radio-${sectionIndex}-${fieldIndex}`} 
                          className="mr-2" 
                        />
                        <label htmlFor={`radio-${sectionIndex}-${fieldIndex}-${optionIndex}`}>
                          {option.choice_text || `Option ${optionIndex + 1}`}
                        </label>
                      </div>
                    ))}
                    
                    {field.field_type === "checkbox" && field.choices.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center mt-1">
                        <input 
                          type="checkbox" 
                          id={`checkbox-${sectionIndex}-${fieldIndex}-${optionIndex}`}
                          name={`checkbox-${sectionIndex}-${fieldIndex}-${optionIndex}`}
                          className="mr-2" 
                        />
                        <label htmlFor={`checkbox-${sectionIndex}-${fieldIndex}-${optionIndex}`}>
                          {option.choice_text || `Option ${optionIndex + 1}`}
                        </label>
                      </div>
                    ))}
                    
                    {field.field_type === "select" && (
                      <select className="border border-gray-300 p-2 w-full rounded-md">
                        <option value="">Select an option</option>
                        {field.choices.map((option, optionIndex) => (
                          <option key={optionIndex} value={option.choice_text}>
                            {option.choice_text || `Option ${optionIndex + 1}`}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            ))}
            
            <div className="mt-6">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}