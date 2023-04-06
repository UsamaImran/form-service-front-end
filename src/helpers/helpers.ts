import { FILE_UPLOAD_URL } from '../constants/constants'

export const Clamp = (value: number, min: number, max: number): number => {
  if (value >= min && value <= max) return value
  if (value < min) return min
  return max
}
export function escapeSearchRegex(value: string): string {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

export const uploadImage = async (folder: string, image: File) => {
  try {
    const data = new FormData()
    data.append('file', image)
    data.append('folder', `ngn42/${folder}`)
    data.append('upload_preset', process.env.NEXT_PUBLIC_PRESET || '')
    data.append('cloud_name', process.env.NEXT_PUBLIC_CLOUD_NAME || '')
    const response = await fetch(FILE_UPLOAD_URL, {
      method: 'post',
      body: data,
    })
    const json = await response.json()
    return json.url
  } catch (err) {}
}

export const groupBy = (property: string, objectArray: any[]) => {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
}

// var people = [{ name: 'Pete', gender: 'Male', age: 22 }, { name: 'Samantha', gender: 'Female', age: 20 }, { name: 'Frank', gender: 'Male', age: 22 }, { name: 'Gary', gender: 'Male', age: 21 }, { name: 'Maria', gender: 'Female', age: 20 }, { name: 'Hannah', gender: 'Female', age: 21 }, { name: 'Pete', gender: 'Male', age: 20 }],
//     groups = ['gender', 'age'],
//     grouped = {};

export const groupByMultiple = (groups: string[], objectArray: any[]) => {
  const grouped: any = {}
  objectArray.forEach((a) => {
    groups
      .reduce((o, g, i) => {
        // take existing object,
        o[a[g]] = o[a[g]] || (i + 1 === groups.length ? [] : {}) // or generate new obj, or
        return o[a[g]] // at last, then an array
      }, grouped)
      .push(a)
  })
  return grouped
}

export const removeDuplicate = (array: string[]) => {
  return array.filter(function (item, pos) {
    return array.indexOf(item) == pos
  })
}

export const excludeField = (object: any, field: string) => {
  const newObject = { ...object }
  delete newObject[field]
  return newObject
}

export const getArrayChunk = (array: any[], pageSize: number, offset: number) => {
  const arr = [...array]
  const start = (offset - 1) * pageSize
  const end = offset * pageSize
  const arrayChunk = arr.slice(start, end)
  return arrayChunk
}

export const removeItem = (id: string, array: any[]) => {
  return array.filter((item) => {
    return item.id !== id
  })
}

export const updateItem = (itemToPut: any, array: any[]) => {
  const index = array.findIndex((item) => {
    return item.id === itemToPut.id
  })

  if (index >= 0) {
    const allData = [...array]
    allData.splice(index, 1, itemToPut)
    return [...allData]
  }
  return array
}
