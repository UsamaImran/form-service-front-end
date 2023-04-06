import { useSessionStorage, useLocalStorage } from './useStorage'

export default function StorageComponent() {
  const [name, setName, removeName] = useSessionStorage('name', 'David')
  const [age, setAge, removeAge] = useLocalStorage('age', 40)

  return (
    <div>
      <div>
        {name} - {age}
      </div>
      <button onClick={() => setName('Elle')}>Set Name</button>
      <button onClick={() => setAge(30)}>Set Age</button>
      <button onClick={(removeName) => setName('Elle')}>Remove Name</button>
      <button onClick={(removeAge) => setName('Elle')}>Remove Age</button>
    </div>
  )
}
