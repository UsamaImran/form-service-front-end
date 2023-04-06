let people = [
  {
    date: '12/12/2021',
    hour: '11:12',
    entityId: '1',
    userId: '12',
    action: 'Created Form',
    setting: '',
    oldValue: '',
    newValue: '',
    notes: [],
  },
  {
    date: '12/12/2021',
    hour: '11:12',
    entityId: '12',
    userId: '12',
    action: 'Created Form',
    setting: '',
    oldValue: '',
    newValue: '',
    notes: [],
  },
  {
    date: '12/12/2021',
    hour: '11:12',
    entityId: '1',
    userId: '12',
    action: 'Created Form',
    setting: '',
    oldValue: '',
    newValue: '',
    notes: [],
  },
  {
    date: '12/12/2021',
    hour: '11:12',
    entityId: '1',
    userId: '12',
    action: 'Created Form',
    setting: '',
    oldValue: '',
    newValue: '',
    notes: [],
  },
  {
    date: '12/12/2021',
    hour: '11:12',
    entityId: '1',
    userId: '1',
    action: 'Created Form',
    setting: '',
    oldValue: '',
    newValue: '',
    notes: [],
  },
  {
    date: '12/12/2021',
    hour: '11:12',
    entityId: '1',
    userId: '12',
    action: 'Created Form',
    setting: '',
    oldValue: '',
    newValue: '',
    notes: [],
  },
]
let groups = ['userId', 'entityId']
let grouped = {}

people.forEach(function (a) {
  groups
    .reduce(function (o, g, i) {
      // take existing object,
      o[a[g]] = o[a[g]] || (i + 1 === groups.length ? [] : {}) // or generate new obj, or
      return o[a[g]] // at last, then an array
    }, grouped)
    .push(a)
})

const getUserLogForEachEntity = (entityIds, userId, grouped) => {
  return entityIds.map((entityId) => {
    const logsPerEntity = grouped[userId][entityId]
    return {
      ...logsPerEntity[logsPerEntity.length - 1],
      totalActions: logsPerEntity.length,
    }
  })
}

const userIds = Object.keys(grouped)
let logToShow = []
userIds.forEach((userId) => {
  const entityIds = Object.keys(grouped[userId])
  const userLogs = getUserLogForEachEntity(entityIds, userId, grouped)
  logToShow = [...logToShow, ...userLogs]
})

const obj = {
  a: 1,
  b: {
    aa: 2,
  }
}
// console.log(obj['b'])
// console.log(logToShow)
