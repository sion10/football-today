import React from 'react'
import TipButton from '../components/TipButton'

module.exports =
  (props) => {
    const arr = [{
      header: '1X',
      accessor: 'onedraw',
      maxWidth: 40,
      minWidth: 40,
      style: { textAlign: 'center', padding: 0 },
      render: row =>
        row.value.markets[3].options[0] ?
          <TipButton item={row.value} tip={row.value.markets[3].options[0]} addTip={props.addTip} tipMarket={row.value.markets[3]} /> :
          ''
    },
    {
      header: '12',
      accessor: 'onetwo',
      maxWidth: 40,
      minWidth: 40,
      style: { textAlign: 'center', padding: 0 },
      render: row =>
        row.value.markets[3].options[1] ?
          <TipButton item={row.value} tip={row.value.markets[3].options[1]} addTip={props.addTip} tipMarket={row.value.markets[3]} /> :
          ''
    },
    {
      header: 'X2',
      accessor: 'twodraw',
      maxWidth: 40,
      minWidth: 40,
      style: { textAlign: 'center', padding: 0 },
      render: row =>
        row.value.markets[3].options[2] ?
          <TipButton item={row.value} tip={row.value.markets[3].options[2]} addTip={props.addTip} tipMarket={row.value.markets[3]} /> :
          ''
    },
    {
      header: 'Over',
      accessor: 'over',
      maxWidth: 40,
      minWidth: 40,
      style: { textAlign: 'center', padding: 0 },
      render: row =>
        row.value.markets[2].options[0] ?
          <TipButton item={row.value} tip={row.value.markets[2].options[0]} addTip={props.addTip} tipMarket={row.value.markets[2]} /> :
          ''
    },
    {
      header: 'Under',
      accessor: 'under',
      maxWidth: 40,
      minWidth: 40,
      style: { textAlign: 'center', padding: 0 },
      render: row =>
        row.value.markets[2].options[1] ?
          <TipButton item={row.value} tip={row.value.markets[2].options[1]} addTip={props.addTip} tipMarket={row.value.markets[2]} /> :
          ''
    },
    {
      header: 'Yes',
      accessor: 'yes',
      maxWidth: 40,
      minWidth: 40,
      style: { textAlign: 'center', padding: 0 },
      render: row =>
        row.value.markets[1].options[0] ?
          <TipButton item={row.value} tip={row.value.markets[1].options[0]} addTip={props.addTip} tipMarket={row.value.markets[1]} /> :
          ''
    },
    {
      header: 'No',
      accessor: 'no',
      maxWidth: 40,
      minWidth: 40,
      style: { textAlign: 'center', padding: 0 },
      render: row =>
        row.value.markets[1].options[1] ?
          <TipButton item={row.value} tip={row.value.markets[1].options[1]} addTip={props.addTip} tipMarket={row.value.markets[1]} /> :
          ''
    }]
    return arr
  }
