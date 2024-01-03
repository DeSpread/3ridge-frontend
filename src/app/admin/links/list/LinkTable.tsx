"use client";

import { CopyAll } from "@mui/icons-material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import Image from "next/image";

import { useLinks } from "../useLinks";

const baseColumns: GridColDef[] = [
  {
    field: "id",
    width: 200,
  },
  {
    field: "href",
  },
  {
    field: "event",
    flex: 1,
    renderCell: (params) => (
      <div>
        <Image src={params.value.imageUrl} alt="" width={30} height={30} />
        {params.value.title}
      </div>
    ),
  },
];

export function LinkTableLoading() {
  return (
    <DataGrid
      columns={baseColumns}
      rows={[]}
      loading={true}
      disableColumnFilter
      disableColumnSelector
      disableDensitySelector
      slots={{ toolbar: GridToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
    />
  );
}

export default function LinkTable() {
  const { links } = useLinks();

  const attributeKeys = [
    ...new Set(
      links
        .map((link) => link.attributes.map((attr) => attr.key).flat())
        .flat(),
    ),
  ];

  const columns: GridColDef[] = [
    ...baseColumns,
    ...attributeKeys.map((key) => ({ field: key })),
    {
      field: "",
      type: "actions",
      getActions({ id }) {
        const link = links.find((link) => link._id === id);

        return [
          <GridActionsCellItem
            key="copy"
            icon={<CopyAll />}
            label="Copy"
            sx={{
              color: "primary.main",
            }}
            onClick={() =>
              navigator.clipboard.writeText(
                `https://${process.env["NEXT_PUBLIC_HOME_URI"]}/short/${link?.href}` ??
                  "",
              )
            }
          />,
        ];
      },
    },
  ];

  const rows = links.map((link) => ({
    id: link._id!,
    href: link.href,
    event: link.event,
    ...link.attributes.reduce(
      (obj, item) => Object.assign(obj, { [item.key]: item.value }),
      {},
    ),
  }));

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      disableColumnFilter
      disableColumnSelector
      disableDensitySelector
      slots={{ toolbar: GridToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
    />
  );
}
