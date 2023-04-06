import { Add } from '@mui/icons-material'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import Button from '../../../components/shared/Button'
import TextInputField from '../../../components/shared/TextInputField'
import ToggleSwitch from '../../../components/shared/ToggleSwitch'
import Tooltip from '../../../components/shared/Tooltip'
import Typography from '../../../components/shared/Typography'

export default function AllUiComponents() {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ width: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Regular</TableCell>
              <TableCell align="right">disabled</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                Primary
              </TableCell>
              <TableCell align="right">No icon</TableCell>
              <TableCell align="center">
                <Button variant="contained" color={'primary'}>
                  Button text
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button variant="contained" color={'primary'} disabled>
                  Button text
                </Button>
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                Primary
              </TableCell>
              <TableCell align="right">Icon right</TableCell>
              <TableCell align="center">
                <Button variant="contained" color={'primary'} endIcon={<Add></Add>}>
                  New
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button variant="contained" color={'primary'} endIcon={<Add></Add>} disabled>
                  New
                </Button>
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                Primary
              </TableCell>
              <TableCell align="right">Icon left</TableCell>
              <TableCell align="center">
                <Button variant="contained" color={'primary'} startIcon={<Add></Add>}>
                  New
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button variant="contained" color={'primary'} startIcon={<Add></Add>} disabled>
                  New
                </Button>
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                Secondary
              </TableCell>
              <TableCell align="right">No icon</TableCell>
              <TableCell align="center">
                <Button variant="outlined" color={'primary'}>
                  Button text
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button variant="outlined" color={'primary'} disabled>
                  Button text
                </Button>
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                Secondary
              </TableCell>
              <TableCell align="right">Icon right</TableCell>
              <TableCell align="center">
                <Button variant="outlined" color={'primary'} endIcon={<Add></Add>}>
                  New
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button variant="outlined" color={'primary'} endIcon={<Add></Add>} disabled>
                  New
                </Button>
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                Secondary
              </TableCell>
              <TableCell align="right">Icon left</TableCell>
              <TableCell align="center">
                <Button variant="outlined" color={'primary'} startIcon={<Add></Add>}>
                  New
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button variant="outlined" color={'primary'} startIcon={<Add></Add>} disabled>
                  New
                </Button>
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                Tertiary
              </TableCell>
              <TableCell align="right">No icon</TableCell>
              <TableCell align="center">
                <Button color={'primary'}>Button</Button>
              </TableCell>
              <TableCell align="center">
                <Button color={'primary'} disabled>
                  Button
                </Button>
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                Tertiary
              </TableCell>
              <TableCell align="right">Icon right</TableCell>
              <TableCell align="center">
                <Button color={'primary'} endIcon={<Add></Add>}>
                  Button
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button color={'primary'} endIcon={<Add></Add>} disabled>
                  Button
                </Button>
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                Tertiary
              </TableCell>
              <TableCell align="right">Icon left</TableCell>
              <TableCell align="center">
                <Button color={'primary'} startIcon={<Add></Add>}>
                  Button
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button color={'primary'} startIcon={<Add></Add>} disabled>
                  Button
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
        <ToggleSwitch />
        <ToggleSwitch defaultChecked={false} />
        <ToggleSwitch disabled={true} />
        <ToggleSwitch defaultChecked={false} disabled />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', marginTop: '100px' }}>
        <Tooltip title="Top left" placement="top-start" open>
          <span style={{ padding: '8px 16px', backgroundColor: '#f6f6f6' }}>Tooltip Text</span>
        </Tooltip>

        <Tooltip title="Top center" placement="top" open>
          <span style={{ padding: '8px 16px', backgroundColor: '#f6f6f6' }}>Tooltip Text</span>
        </Tooltip>

        <Tooltip title="Top right" placement="top-end" open>
          <span style={{ padding: '8px 16px', backgroundColor: '#f6f6f6' }}>Tooltip Text</span>
        </Tooltip>

        <Tooltip title="Left" placement="left" open>
          <span style={{ padding: '8px 16px', backgroundColor: '#f6f6f6' }}>Tooltip Text</span>
        </Tooltip>

        <Tooltip title="Right" placement="right" open>
          <span style={{ padding: '8px 16px', backgroundColor: '#f6f6f6' }}>Tooltip Text</span>
        </Tooltip>

        <Tooltip title="Bottom left" placement="bottom" open>
          <span style={{ padding: '8px 16px', backgroundColor: '#f6f6f6' }}>Tooltip Text</span>
        </Tooltip>

        <Tooltip title="Bottom center" placement="bottom-end" open>
          <span style={{ padding: '8px 16px', backgroundColor: '#f6f6f6' }}>Tooltip Text</span>
        </Tooltip>

        <Tooltip title="Bottom right" placement="bottom-start" open>
          <span style={{ padding: '8px 16px', backgroundColor: '#f6f6f6' }}>Tooltip Text</span>
        </Tooltip>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', marginTop: '100px' }}>
        <TextInputField variant={'outlined'} labelText="Label" placeholder="Placeholder..." required infoIcon />
        <TextInputField variant={'outlined'} labelText="Label" placeholder="Placeholder..." value={'filled'} infoIcon />
        <TextInputField variant={'outlined'} labelText="Label" placeholder="Placeholder..." disabled />
        <TextInputField
          variant={'outlined'}
          labelText="Label"
          placeholder="Placeholder..."
          value={'filled'}
          error
          helperText="Error message"
        />
      </div>
      <h1>Text Component</h1>
      <Typography variant="h1" style={{ fontSize: '24px' }}>
        Heading
      </Typography>
      <Typography variant="h2" style={{ fontSize: '18px' }}>
        Heading
      </Typography>
      <Typography variant="h3" style={{ fontSize: '16px' }}>
        Heading
      </Typography>
      <Typography variant="body1" style={{ fontSize: '16px' }}>
        Heading
      </Typography>
    </>
  )
}
