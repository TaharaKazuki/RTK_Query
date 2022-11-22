import { useState } from 'react'
import { PasswordInputStyled, PasswordInputWrapper, ToggleButton } from './styled'

type Props = Omit<JSX.IntrinsicElements['input'], 'ref'>

export const PasswordInput = (props: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(true)

  return (
    <>
      <PasswordInputWrapper>
        <PasswordInputStyled type="password" placeholder="Password" {...props} />
        <ToggleButton onClick={() => setShowPassword((s) => !s)}>
          {showPassword ? 'Hide' : 'Show'}
        </ToggleButton>
      </PasswordInputWrapper>
      <div>{showPassword ? props.value : ''}</div>
    </>
  )
}
