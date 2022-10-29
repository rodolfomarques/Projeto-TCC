import { useContext } from 'react';
import { SpeedDial } from '@mui/material';
import { DomainAdd } from '@mui/icons-material';
import { ComponentContext } from '../../pages/Home/Home';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';


const SpeedDialButton = () => {

    const { setOpenNewPlaceForm } = useContext(ComponentContext)

    const actions = [
        { icon: <DomainAdd />, name: 'Adicionar Local', onClick: () => {setOpenNewPlaceForm(true)} },
    ];

    return (
            <SpeedDial
                ariaLabel="Acesso rápido das funções"
                sx={{ position: 'absolute', bottom: 40, right: 20 }}
                icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.onClick}
                    />
                ))}
            </SpeedDial>
    );
}

export default SpeedDialButton
