import { Stack, Pagination } from "@mui/material";

interface SuperheroesPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function SuperheroesPagination({
  totalPages,
  currentPage,
  onPageChange,
}: SuperheroesPaginationProps) {
  return (
    <Stack alignItems="center" sx={{ mt: 4, width: "100%" }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, value) => onPageChange(value)}
        size="large"
        color="primary"
      />
    </Stack>
  );
}
