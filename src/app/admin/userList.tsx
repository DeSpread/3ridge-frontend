"use client";

import { Cancel, Delete, Edit, Save } from "@mui/icons-material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridToolbar,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";

import { useUserMutation } from "./useUserMutation";

import { UserItemFragment } from "@/__generated__/graphql";
import { useUsers } from "@/hooks/user/useUsers";

interface UserListRow extends UserItemFragment {
  id: GridRowId;
}

export default function UserList() {
  const { users } = useUsers();

  const [rows, setRows] = useState<UserListRow[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const { updateUser } = useUserMutation();

  const columns: GridColDef[] = [
    {
      field: "id",
      width: 200,
    },
    {
      field: "email",
      width: 200,
    },
    {
      field: "type",
      type: "singleSelect",
      editable: true,
      valueOptions: ["user", "admin"],
    },
    {
      field: "actions",
      type: "actions",
      width: 100,
      getActions({ id }) {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key="save"
              icon={<Save />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={() => handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key="cancel"
              icon={<Cancel />}
              label="Cancel"
              className="textPrimary"
              onClick={() => handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key="edit"
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key="delete"
            icon={<Delete />}
            label="Delete"
            // onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  function handleEditClick(id: GridRowId) {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.Edit },
    }));
  }

  function handleSaveClick(id: GridRowId) {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View },
    }));
  }

  function handleRowModesModelChange(newRowModesModel: GridRowModesModel) {
    setRowModesModel(newRowModesModel);
  }

  function handleCancelClick(id: GridRowId) {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));
  }

  useEffect(() => {
    const newRows = users.map((user) => ({ ...user, id: user._id! }));
    setRows(newRows);
  }, [users]);

  function processRowUpdate(newRow: typeof rows[number]) {
    if (!newRow._id) {
      throw new Error("_id is not string type");
    }

    updateUser({
      id: newRow._id,
      input: {
        type: newRow.type,
      },
    });
    setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)));
    return newRow;
  }

  return (
    <DataGrid
      sx={{ maxHeight: "90vh" }}
      columns={columns}
      rows={rows}
      disableColumnFilter
      disableColumnSelector
      disableDensitySelector
      editMode="row"
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      processRowUpdate={processRowUpdate}
      slots={{ toolbar: GridToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
    />
  );
}
