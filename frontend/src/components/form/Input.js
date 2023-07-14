import styles from './Input.module.css'

function Input({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  multiple,
  date,
}) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <input
        type={type}
        name={name}
        data={date}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        {...(multiple ? { multiple } : '')}
      />
    </div>
  )
}

export default Input
