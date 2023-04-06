import React, { useState, useEffect } from 'react'
import { Container, Draggable, OnDropCallback } from 'react-smooth-dnd'
import SortableListStyles from './SortableList.module.scss'

interface IDataProps {
  data: Array<string | JSX.Element> | []
  label?: string
  onDrop: OnDropCallback
  containerClassName?: string
  innerContainerClassName?: string
  mainContainer?: string
}

const SortableList: React.FC<IDataProps> = ({
  data,
  label = '',
  onDrop,
  containerClassName = '',
  innerContainerClassName = '',
  mainContainer = '',
}): React.ReactElement => {
  const [items, setItems] = useState(data)

  useEffect(() => {
    setItems(data)
  }, [data])

  return (
    <div className={mainContainer}>
      <Container
        dragHandleSelector=".drag-handle"
        nonDragAreaSelector="input"
        lockAxis="y"
        onDrop={onDrop}
        render={(ref) => {
          return (
            <div>
              <label className={SortableListStyles['container__label']}>{label}</label>
              <div className={containerClassName} ref={ref}>
                {items.map((row, index): string | JSX.Element | number => {
                  return (
                    <Draggable
                      key={index}
                      render={(): JSX.Element => {
                        return (
                          <div
                            className={[innerContainerClassName, SortableListStyles['draggable_container']].join(' ')}
                          >
                            <img
                              height={16}
                              width={10}
                              src="/images/dragableicon.svg"
                              className={['drag-handle', SortableListStyles['container--Draggable__dragging_img']].join(
                                ' ',
                              )}
                            />
                            <div className={SortableListStyles['container--Draggable__p']}>{row}</div>
                          </div>
                        )
                      }}
                    />
                  )
                })}
              </div>
            </div>
          )
        }}
      />
    </div>
  )
}

export default SortableList
