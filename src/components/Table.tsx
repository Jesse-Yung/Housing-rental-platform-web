import { styled } from 'linaria/react'


export const TableContainer = styled.div`
   display: flex;
   position: relative;
   align-self: center;
   flex-direction: column;
   align-items: center;
   color: black;
   padding: 16px;
   box-shadow: 0 4px 8px #ddd;
   border-radius: 2px;
   background-color: #FFFFFF;
`

export const Container = styled.div`
   display: flex;
   flex-direction: column;
   .pagination {
      display: flex;
      flex-direction: row;
      font-size: 12px;
      list-style: none;
      margin: 32px 16px ;
      padding: 0;
   }
   .pagination a {
      cursor: default;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #1089ff;
      color: #1089ff;
      margin-left: 10px;
   }
   .pagination li:not(.disabled) a:hover {
      background-color: bisque;
      cursor: pointer;
   }
   .pagination li a {
      font-weight: bold;
   }
   .pagination li.active a {
      color: #fff;
      background: #1089ff;
   }
   .pagination li.disabled a {
      pointer-events: none;
      color: rgb(198, 197, 202);
      border: 1px solid rgb(198, 197, 202);
   }
`


export const Table = styled.table`
   background-color: #fff;
   border-collapse: collapse;
   min-width: 1100px;
`

export const WorkTableContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   align-self: flex-start;
   font-size: 20px;
   padding: 16px;
   box-shadow: 0 4px 8px #ddd;
   border-radius: 2px;
   min-width: 240px;
   min-height: 460px;
   background-color: #FFFFFF;
   h4 {
       margin: 0;
       margin-bottom: 16px;
   }
`


export const WorkTable = styled.table`
   background-color: #fff;
   border-collapse: collapse;
   border: 1px solid #1089ff;
   min-width: 800px;
`


export const Thead = styled.thead`
   background-color: #1089ff;
   color: #fff;
   position: sticky;
   top: 0;
   border: 1px solid #1089ff;
   z-index: 999;
   th {
      border: none;
      padding: 16px 20px;
      font-size: 14px;
      color: #fff;
      text-align: left;
      &.name {
         min-width: 130px;
      }
      &.time {
         min-width: 60px;
      }
      &.unit {
         min-width: 60px;
      }
      &.ratio {
         min-width: 40px;
      }
   }
`


export const Tbody = styled.tbody`
    display: table-row-group;
    vertical-align: middle;
    border: 1px solid #1089ff;
    td {
      border: none;
      padding: 16px 20px;
      font-size: 14px;
      color: black;
      max-width: 280px;
      overflow-y: hidden;
      select {
         width: 260px;
         max-width: none;
      }
   }
   tr {
      cursor: pointer;
      &:hover {
         background-color: #c5e0f3;
      }
   }
`

export const Items = styled.div`
  overflow: auto;
  min-height: 10px;
  max-height: 200px;
`

export const Item = styled.label`
  display: flex;
  margin: 10px;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px dotted transparent;

  :hover {
    border-bottom: 1px dotted #ccc;
  }
`

export const ItemLabel = styled.div`
  margin: 5px 10px;
`

export const SearchInput = styled.input`
   padding: 6px;
   font-size: 18px;
   width: 300px;
   align-self: center;
   border-radius: 6px;
   border: none;
   margin-left: 32px;
`
