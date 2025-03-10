// React Imports
import type { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'

// Third-Party Imports
import { Controller, useFormContext } from 'react-hook-form'

// MUI Imports
import { LoadingButton } from '@mui/lab'
import { FormLabel, Stack } from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import Link from '@mui/material/Link'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Select from '@mui/material/Select'
import type { TypographyProps } from '@mui/material/Typography'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'
import CustomInputVertical from '@core/components/custom-inputs/Vertical'
import type { CustomInputVerticalData } from '@core/components/custom-inputs/types'

type StepBillingDetailsProps = {
  handlePrev: () => void
  activeStep: number
  onSubmit: (data: any) => void
}

type OptionType = {
  label: string
  value: string
}

// Styled Components
const Content = styled(Typography, {
  name: 'MuiCustomInputVertical',
  slot: 'content'
})<TypographyProps>(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center'
}))

// Vars
const customInputData: CustomInputVerticalData[] = [
  {
    title: 'Gratis',
    value: 'FREE',
    content: (
      <Content component='div' className='flex justify-center items-center flex-col bs-full gap-2'>
        <Typography variant='body2' className='mlb-auto'>
          Ideal para iniciar la certificación y pequeños negocios
        </Typography>
        <div>
          <Typography color='primary' variant='body2' component='sup' className='self-start'>
            $
          </Typography>
          <Typography color='primary' variant='h4' component='span'>
            0
          </Typography>
          <Typography color='text.disabled' variant='body2' component='sub' className='self-end'>
            /mes
          </Typography>
        </div>
      </Content>
    ),
    isSelected: true
  },
  {
    title: 'Estándar',
    value: 'STANDARD',
    content: (
      <Content component='div' className='flex justify-center items-center flex-col bs-full'>
        <Typography variant='body2' className='mlb-auto'>
          Esencial para pequeños y medianos negocios
        </Typography>
        <div>
          <Typography color='primary' variant='body2' component='sup' className='self-start'>
            $
          </Typography>
          <Typography color='primary' variant='h4' component='span'>
            ...
          </Typography>
          <Typography variant='body2' component='sub' className='self-end' color='text.disabled'>
            /mes
          </Typography>
        </div>
      </Content>
    )
  },
  {
    title: 'Empresarial',
    value: 'ENTERPRISE',
    content: (
      <Content component='div' className='flex justify-center items-center flex-col bs-full'>
        <Typography variant='body2' className='mlb-auto'>
          Solution for enterprise & organizations Solución para empresas que generan alto volumen de facturación
        </Typography>
        <div>
          <Typography color='primary' variant='body2' component='sup' className='self-start'>
            $
          </Typography>
          <Typography color='primary' variant='h4' component='span'>
            ...
          </Typography>
          <Typography variant='body2' component='sub' className='self-end' color='text.disabled'>
            /mes
          </Typography>
        </div>
      </Content>
    )
  }
]

const howTheyFoundYouOptions: OptionType[] = [
  { label: 'Facebook', value: 'facebook' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'Twitter', value: 'twitter' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'TikTok', value: 'tiktok' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'Publicidad en Línea', value: 'publicidad_en_linea' },
  { label: 'Recomendación de un Amigo', value: 'recomendacion_amigo' },
  { label: 'Búsqueda en Google', value: 'busqueda_google' },
  { label: 'Evento o Feria', value: 'evento_feria' },
  { label: 'Otro', value: 'otro' }
]

const StepBillingDetails = ({ handlePrev, activeStep, onSubmit }: StepBillingDetailsProps) => {
  // States
  const [selectedOption, setSelectedOption] = useState<string>('FREE')
  const [openTermsDialog, setOpenTermsDialog] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useFormContext()

  // Set default plan value
  useEffect(() => {
    setValue('plan', 'FREE')
  }, [setValue])

  const handleOptionChange = (prop: string | ChangeEvent<HTMLInputElement>) => {
    const value = typeof prop === 'string' ? prop : (prop.target as HTMLInputElement).value

    setSelectedOption(value)
    setValue('plan', value)
  }

  const handleOpenTermsDialog = () => {
    setOpenTermsDialog(true)
  }

  const handleCloseTermsDialog = () => {
    setOpenTermsDialog(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mbe-5'>
        <Typography variant='h4'>Seleccionar Plan</Typography>
        <Typography>Seleccionar el plan acomodado</Typography>
      </div>
      <Grid container spacing={5}>
        {customInputData.map((item, index) => (
          <CustomInputVertical
            type='radio'
            key={index}
            data={item}
            disabled
            gridProps={{ xs: 12, sm: 4 }}
            selected={selectedOption}
            name='custom-radios-basic'
            handleChange={handleOptionChange}
          />
        ))}
      </Grid>
      <Stack spacing={2} className='mbs-3'>
        <Typography variant='subtitle2'>Pronto podrá seleccionar otro plan y pagar en línea </Typography>
      </Stack>
      <div className='mbs-12 mbe-5'>
        <Typography variant='h4'>Información Adicionales</Typography>
        {/* <Typography></Typography> */}
      </div>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <Controller
            name='howTheyFoundYou'
            control={control}
            defaultValue=''
            rules={{ required: 'Este campo es requerido' }}
            render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
              <FormControl fullWidth error={!!error}>
                <InputLabel id='howTheyFoundYou-label'>¿Cómo nos encontraste?</InputLabel>
                <Select
                  label='¿Cómo nos encontraste?'
                  value={value}
                  onChange={onChange}
                  inputRef={ref}
                  disabled={isSubmitting}
                >
                  {howTheyFoundYouOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl error={!!errors.isProvider}>
            <FormLabel>¿Te interesa proveer servicios en nuestra plataforma?</FormLabel>
            <Controller
              name='isProvider'
              control={control}
              defaultValue=''
              rules={{ required: 'Este campo es requerido' }}
              render={({ field: { onChange, value } }) => (
                <RadioGroup row value={value} onChange={onChange}>
                  <FormControlLabel value='yes' control={<Radio disabled={isSubmitting} />} label='Sí' />
                  <FormControlLabel value='no' control={<Radio disabled={isSubmitting} />} label='No' />
                </RadioGroup>
              )}
            />
            {errors.isProvider && <FormHelperText error>{String(errors.isProvider.message)}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Controller
                name='termsAccepted'
                control={control}
                defaultValue={false}
                rules={{ required: 'Debe aceptar los términos y condiciones' }}
                render={({ field: { onChange, value, ref } }) => (
                  <Checkbox
                    checked={value}
                    onChange={onChange}
                    inputRef={ref}
                    disabled={isSubmitting}
                    color='primary'
                  />
                )}
              />
            }
            label={
              <Typography>
                Acepto los{' '}
                <Link component='button' variant='body2' onClick={handleOpenTermsDialog}>
                  Términos y Condiciones
                </Link>
              </Typography>
            }
          />
          {errors.termsAccepted && (
            <Typography color='error' variant='caption'>
              {String(errors.termsAccepted.message)}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} className='flex justify-between'>
          <Button
            disabled={activeStep === 0}
            variant='outlined'
            color='secondary'
            onClick={handlePrev}
            startIcon={<DirectionalIcon ltrIconClass='ri-arrow-left-line' rtlIconClass='ri-arrow-right-line' />}
          >
            Anterior
          </Button>

          <LoadingButton variant='contained' type='submit' loading={isSubmitting} loadingPosition='center'>
            {isSubmitting ? 'Creando Cuenta' : 'Crear Cuenta'}
          </LoadingButton>
        </Grid>
      </Grid>
      <Dialog open={openTermsDialog} onClose={handleCloseTermsDialog}>
        <DialogTitle>Términos y Condiciones</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Uso de la Aplicación: eCF-MSeller es una solución basada en tecnología SaaS (Software como Servicio)
            diseñada para proporcionar y facilitar la adopción de las Facturas Electrónicas, de acuerdo con los
            lineamientos establecidos por la Dirección General de Impuestos Internos (DGII). Esta herramienta está
            orientada a apoyar tanto a desarrolladores como a pequeñas empresas en la implementación de procesos de
            facturación electrónica eficientes y conformes con las normativas vigentes.
            <br />
            <br />
            Beneficios Clave:
            <br />
            1. Cumplimiento Normativo: Garantiza la generación de facturas electrónicas que cumplen con los requisitos
            legales de la DGII.
            <br />
            2. Facilidad de Integración: Herramientas y APIs diseñadas para integrarse fácilmente con sistemas
            existentes.
            <br />
            3. Optimización de Procesos: Automatiza tareas relacionadas con la facturación, reduciendo errores manuales
            y ahorrando tiempo.
            <br />
            4. Acceso para Pequeñas Empresas y Desarrolladores: Brinda una solución accesible y escalable que permite a
            las pequeñas empresas y a los desarrolladores implementar facturación electrónica sin necesidad de una
            infraestructura compleja.
            <br />
            <br />
            Términos y Condiciones:
            <br />
            1. Cuentas Gratuitas: Las cuentas gratuitas de eCF-MSeller están sujetas a condiciones específicas,
            incluyendo la posibilidad de que ciertos datos sean compartidos con sistemas de terceros para facilitar la
            integración, el análisis y la mejora del servicio. Este uso de datos se realizará respetando las políticas
            de privacidad establecidas.
            <br />
            2. Responsabilidad del Usuario: El usuario es responsable de asegurarse de que la información ingresada en
            la plataforma sea verídica y esté alineada con las normativas aplicables.
            <br />
            3. Soporte Técnico: eCF-MSeller ofrece soporte técnico para resolver problemas y consultas relacionados con
            el uso de la plataforma, especialmente en temas de integración y cumplimiento normativo.
            <br />
            4. Actualizaciones del Servicio: La plataforma puede recibir mejoras y actualizaciones periódicas para
            mantener su funcionalidad en línea con los requisitos de la DGII y para ofrecer nuevas características a sus
            usuarios.
            <br />
            5. Privacidad y Seguridad: eCF-MSeller utiliza medidas avanzadas de seguridad para proteger la información
            de los usuarios. Sin embargo, se recomienda a los usuarios adoptar prácticas responsables, como el manejo
            seguro de contraseñas y la limitación de accesos no autorizados.
            <br />
            6. Modificaciones a los Términos: La empresa se reserva el derecho de actualizar estos términos y
            condiciones. Cualquier cambio relevante será notificado a los usuarios con anticipación razonable.
            <br />
            <br />
            Al usar eCF-MSeller, los usuarios confirman su comprensión y aceptación de estos términos y condiciones.
            Para más información o soporte adicional, el equipo de atención al cliente está disponible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTermsDialog} color='primary'>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  )
}

export default StepBillingDetails
