import { ActionType } from '../../constants/enums'
import { IForm, IRowAction } from '../../graphql/types/ApiTypes'
import { ActionType as ServerActionType } from '../../graphql/types/graphql-global-types'
import { removeDuplicate } from '../../helpers/helpers'
import { addForms, updateForms } from './IndexPageTable.service'

export const duplicateForms = async (userId: string, forms: IForm[], data: any) => {
  try {
    const addFormsPromises: Promise<any>[] = []
    forms.map((form) => {
      addFormsPromises.push(
        addForms({
          input: {
            menu: form.menu,
            subMenu: form.subMenu,
            name: data.name,
            tags: data.tags,
          },
        }),
      )
    })

    await Promise.all(addFormsPromises)
  } catch (err) {}
}
export const updateTags = async (forms: string[], tags: string[]) => {
  try {
    const uniqueTags = removeDuplicate(tags)

    const dataToUpdate = forms.map((id) => {
      return {
        id: id,
        tags: [...uniqueTags],
      }
    })
    return updateForms({ updateFormInput: dataToUpdate })
  } catch (err) {}
}

const getRowActionValue = (rowAction: IRowAction[], serverAction: ServerActionType, type: 'single' | 'group') => {
  const action = rowAction.find((row) => row.action === serverAction)
  return (action && action[type]) || false
}

export const mapToAction = (action: ActionType) => {
  switch (action) {
    case ActionType.DUPLICATE:
      return ServerActionType.duplicate
    case ActionType.DELETE:
      return ServerActionType.delete
    case ActionType.ADD_REMOVE_PERMISSIONS:
      return ServerActionType.permission
    case ActionType.ADD_REMOVE_TAGS:
      return ServerActionType.tag
  }
}
export const isAvailable = (rowAction: IRowAction[], action: ActionType, type: 'single' | 'group') => {
  const serverAction = mapToAction(action) || ServerActionType.delete
  return getRowActionValue(rowAction, serverAction, type)
}
