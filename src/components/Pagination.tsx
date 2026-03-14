import { useMemo } from "react";
import { Text, Flex, Button, Select } from "@radix-ui/themes";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import "./pagination.scss";

export interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export default function Pagination({
  page,
  pageSize,
  total,
  pageSizeOptions = [5, 10, 20, 50],
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  const pages = useMemo(() => {
    const maxVisible = 5;
    const result: (number | "ellipsis-start" | "ellipsis-end")[] = [];

    if (totalPages <= maxVisible + 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    result.push(1);

    if (page > 3) {
      result.push("ellipsis-start");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) {
      result.push(i);
    }

    if (page < totalPages - 2) {
      result.push("ellipsis-end");
    }

    result.push(totalPages);

    return result;
  }, [page, totalPages]);

  return (
    <div className="pagination">
      <div className="pagination__info">
        <Text size="2" color="gray">
          Showing {from} - {to} of {total} results
        </Text>
        <Select.Root
          value={String(pageSize)}
          onValueChange={(val) => onPageSizeChange(Number(val))}
        >
          <Select.Trigger variant="surface" />
          <Select.Content>
            {pageSizeOptions.map((opt) => (
              <Select.Item key={opt} value={String(opt)}>
                {opt} / page
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>
      <div className="pagination__pages">
        <Button
          variant="ghost"
          size="2"
          mr="4"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <TbChevronLeft size={16} />
          Previous
        </Button>
        {pages.map((p) =>
          typeof p === "string" ? (
            <Text key={p} size="2" color="gray" className="pagination__page-ellipsis" style={{ minWidth: 32, textAlign: "center", letterSpacing: 2 }}>
              ...
            </Text>
          ) : (
            <Button
              key={p}
              className="pagination__page-btn--numbered"
              variant={p === page ? "soft" : "soft"}
              color={p === page ? undefined : "gray"}
              size="2"
              style={{ minWidth: 32 }}
              onClick={() => onPageChange(p)}
            >
              {p}
            </Button>
          )
        )}
        <Button
          variant="ghost"
          size="2"
          ml="4"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
          <TbChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
