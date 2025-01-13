import { DataGrid, GridToolbarQuickFilter  } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import PropTypes from 'prop-types'

Table.propTypes = {
    rows: PropTypes.array,
    columns: PropTypes.array,
    mapRef: PropTypes.object,
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

export default function Table({ rows, columns, mapRef }) {
  function onClickRow(row) {
    row = row.row;
    mapRef.current.addMarker(row.lon_lat);
  }

  return (
    <div style={{ minHeight: 300, maxHeight: 600, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            onRowClick={onClickRow}
            slots={{ toolbar: QuickSearchToolbar  }}
        />
    </div>
  )
}