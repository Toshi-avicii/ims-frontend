function TextInput({ labelText, inputType, inputName, inputPlaceholder, changeEvent, inputValue, width, onFocus, elRef }) {
  return (
    <div className={`mb-6 ${width && width}`}>
        <label className="block text-gray-600 text-md font-bold mb-2">{labelText}</label>
        <input 
            type={inputType} 
            name={inputName} 
            placeholder={inputPlaceholder} 
            className={`shadow bg-slate-50 w-full p-4 focus:outline-0 focus-within:bg-slate-100 rounded-lg ${onFocus && 'focus:outline-1 focus:outline-black'}`}
            onChange={changeEvent}
            value={inputValue} 
            ref={elRef && elRef}
        />
    </div>
  ) 
}

export default TextInput