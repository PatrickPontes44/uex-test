import { DataGrid, GridToolbarQuickFilter  } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import PropTypes from 'prop-types'

Table.propTypes = {
    rows: PropTypes.array,
    columns: PropTypes.array,
}

function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 0.5,
          pb: 0,
        }}
      >
        <GridToolbarQuickFilter sx={{width: '100%'}} placeholder='Pesquisar' />
      </Box>
    );
}

export default function Table({ rows, columns }) {
  return (
    <div style={{ minHeight: 300, maxHeight: 600, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            onRowClick={(row) => console.log(row)}
            slots={{ toolbar: QuickSearchToolbar  }}
        />
    </div>
  )
}