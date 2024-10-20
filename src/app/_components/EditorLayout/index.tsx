/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from 'react'
import { useDrop } from 'react-dnd'

import { useBuildStore } from '../../../../store/useStore'

interface Tool {
  id: string
  title: string
  type: string
  media?: {
    url: string
  }
}

interface ComponentInstance {
  id: string
  type: string
  props?: {
    [key: string]: any
  }
}

export const EditorLayout: React.FC = () => {
  const { components, tools, addComponent, removeComponent, selectComponent } = useBuildStore()
  const dropRef = useRef<HTMLDivElement>(null)

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: tools.map(tool => tool.type || 'DEFAULT_TYPE'),
    drop: (item: Tool, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        addComponent(item) // Add the component only if shallow drop is detected
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  // Attaching the drop ref on component mount
  useEffect(() => {
    if (dropRef.current) {
      drop(dropRef)
    }
  }, [drop, dropRef])

  // Logging for debugging
  useEffect(() => {
    console.log('isOver:', isOver, 'canDrop:', canDrop)
  }, [isOver, canDrop])

  const renderComponent = (component: ComponentInstance) => {
    switch (component.type) {
      case 'BOX':
        return (
          <div
            key={component.id}
            className="box-component"
            style={{
              width: `${component.props?.width || 100}px`,
              height: `${component.props?.height || 100}px`,
              backgroundColor: component.props?.backgroundColor || 'gray',
            }}
            onClick={() => selectComponent(component.id)}
          >
            <p>{component.props?.text || 'Box'}</p>
            <button onClick={() => removeComponent(component.id)}>Remove</button>
          </div>
        )
      case 'TEXT':
        return (
          <div key={component.id} onClick={() => selectComponent(component.id)}>
            <p style={{ color: component.props?.color, fontSize: component.props?.fontSize }}>
              {component.props?.text || 'Text'}
              <button onClick={() => removeComponent(component.id)}>Remove</button>
            </p>
          </div>
        )
      case 'IMAGE':
        return (
          <div key={component.id} onClick={() => selectComponent(component.id)}>
            <img src={component.props?.src || '/placeholder.jpg'} alt="Dropped image" />
            <button onClick={() => removeComponent(component.id)}>Remove</button>
          </div>
        )
      default:
        return <div key={component.id}>Unknown Component</div>
    }
  }

  return (
    <>
      {components.map(renderComponent)}
      <div ref={dropRef} className="drop-zone">
        {isOver && canDrop ? 'Release here' : 'Drop here'}
      </div>
    </>
  )
}
