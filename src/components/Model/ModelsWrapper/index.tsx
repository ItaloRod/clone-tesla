import React, { useCallback, useRef, useState } from 'react';
import ModelsContext, { CarModel } from '../ModelsContext';
import { Container, OverlaysRoot } from './styles';
import ModelOverlay from '../ModelOverlay'
const ModelsWrapper: React.FC = ({ children }) => {

  const wrapperRef = useRef<HTMLDivElement>(null)
  const [registeredModels, setRegisteredModels] = useState<CarModel[]>([])

  const registerModel = useCallback((model: CarModel) => {
    setRegisteredModels((state: CarModel[]) => [...state, model])
  }, [])

  const unregisterModel = useCallback((modelName: string) => {
    setRegisteredModels(state => state.filter(model => model.modelName !== modelName))
  }, [])

  const getModelByName = useCallback((modelName: string) => {
    return registeredModels.find(item => item.modelName === modelName) || null
  }, [registeredModels])

  return (
    <ModelsContext.Provider
      value={{
        wrapperRef,
        registerModel,
        registeredModels,
        unregisterModel,
        getModelByName
      }}>
      <Container ref={wrapperRef}>
        <OverlaysRoot>
          {registeredModels.map(item => (
            <ModelOverlay key={item.modelName}>{item.overlayNode}</ModelOverlay>
          ))}
        </OverlaysRoot>

        {children}
      </Container>
    </ModelsContext.Provider>

  );
};

export default ModelsWrapper;
