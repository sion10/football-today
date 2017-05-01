import React from 'react'
import TipButton from '../components/TipButton'

module.exports =
  (props) => {
    const arr = [{
      header: 'Date',
      accessor: 'date',
      style: { display: 'inline-flex', justifyContent: 'left', alignItems: 'center', textAlign: 'center', fontSize: 8 },
      maxWidth: 68,
      minWidth: 68
    }, {
      header: 'Sides',
      accessor: 'sides',
      minWidth: 100,
      style: { display: 'inline-flex', justifyContent: 'left', alignItems: 'center', textAlign: 'center', fontSize: 8 }
    }, {
      header: '1',
      accessor: 'one',
      maxWidth: 40,
      minWidth: 40,
      style: { textAlign: 'center', padding: 0 },
      render: row =>
        <TipButton item={row.value} tip={row.value.markets[0].options[0]} addTip={props.addTip} tipMarket={row.value.markets[0]} />
    }, {
      header: 'X',
      accessor: 'x',
      maxWidth: 40,
      minWidth: 40,
      style: { textAlign: 'center', padding: 0 },
      render: row =>
        <TipButton item={row.value} tip={row.value.markets[0].options[1]} addTip={props.addTip} tipMarket={row.value.markets[0]} />
    },
    {
      header: '2',
      accessor: 'two',
      maxWidth: 40,
      minWidth: 40,
      style: { textAlign: 'center', padding: 0 },
      render: row =>
        <TipButton item={row.value} tip={row.value.markets[0].options[2]} addTip={props.addTip} tipMarket={row.value.markets[0]} />
    },
    {
      header: '+',
      expander: true,
      maxWidth: 20,
      minWidth: 20,
      style: { display: 'inline-flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' },
      render: ({ isExpanded }) => (
        <div style={{ textAlign: 'center' }}>
          {isExpanded ? '-' : '+'}
        </div>
      )
    }]
    return arr
  }
