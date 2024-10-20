import React from 'react'

// eslint-disable-next-line import/extensions
import { useBuildStore } from '../../../../store/useStore' // Assuming you're using Zustand or similar

export const PropertyPanel: React.FC = () => {
  const { selectedComponentId, components, updateComponent } = useBuildStore()
  const selectedComponent = components.find(c => c.id === selectedComponentId)

  if (!selectedComponent) {
    return <div className="p-4">No component selected</div>
  }

  const handlePropertyChange = (key: string, value: any) => {
    updateComponent(selectedComponent.id, { props: { ...selectedComponent.props, [key]: value } })
  }

  const renderProperties = (component: { type: string; props?: { [key: string]: any } }) => {
    switch (component.type) {
      case 'TEXT':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Text</label>
              <input
                type="text"
                defaultValue={component.props?.text || ''}
                onChange={e => handlePropertyChange('text', e.target.value)}
                placeholder="Enter text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Color</label>
              <input
                type="color"
                value={component.props?.color || '#000000'}
                onChange={e => handlePropertyChange('color', e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Font Size</label>
              <input
                type="range"
                min="10"
                max="60"
                defaultValue={component.props?.fontSize || '30'}
                onChange={e => handlePropertyChange('fontSize', e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
          </div>
        )
      case 'IMAGE':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                defaultValue={component.props?.src || ''}
                onChange={e => handlePropertyChange('src', e.target.value)}
                placeholder="Enter URL"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Width</label>
              <input
                type="number"
                value={component.props?.width || 100}
                onChange={e => handlePropertyChange('width', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Width (px)"
                max={778}
                min={30}
              />
              <input
                type="range"
                min="30"
                max="778"
                value={component.props?.width || 100}
                onChange={e => handlePropertyChange('width', e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Height</label>
              <input
                type="number"
                value={component.props?.height || 100}
                onChange={e => handlePropertyChange('height', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Height (px)"
                max={778}
                min={30}
              />
              <input
                type="range"
                min="30"
                max="778"
                value={component.props?.height || 100}
                onChange={e => handlePropertyChange('height', e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
          </div>
        )
      case 'BOX':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Background Color</label>
              <input
                type="color"
                value={component.props?.backgroundColor || '#ffffff'}
                onChange={e => handlePropertyChange('backgroundColor', e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Width</label>
              <input
                type="number"
                value={component.props?.width || 100}
                onChange={e => handlePropertyChange('width', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Width (px)"
                max={778}
                min={30}
              />
              <input
                type="range"
                min="30"
                max="778"
                value={component.props?.width || 100}
                onChange={e => handlePropertyChange('width', e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Height</label>
              <input
                type="number"
                value={component.props?.height || 100}
                onChange={e => handlePropertyChange('height', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Height (px)"
                max={778}
                min={30}
              />
              <input
                type="range"
                min="30"
                max="778"
                value={component.props?.height || 100}
                onChange={e => handlePropertyChange('height', e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Text</label>
              <input
                type="text"
                defaultValue={component.props?.text || ''}
                onChange={e => handlePropertyChange('text', e.target.value)}
                placeholder="Enter text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Text Color</label>
              <input
                type="color"
                value={component.props?.color || '#000000'}
                onChange={e => handlePropertyChange('color', e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Font Size</label>
              <input
                type="range"
                min="10"
                max="60"
                defaultValue={component.props?.fontSize || '30'}
                onChange={e => handlePropertyChange('fontSize', e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-4 border-l">
      <h2 className="text-xl font-bold mb-4">Properties</h2>
      {renderProperties(selectedComponent)}
    </div>
  )
}

export default PropertyPanel
