"use client";
import { useCategories } from "@/hooks/use-categories";
import { useState } from "react";

function DashboardPage() {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, error } = useCategories(page);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>An error has occurred: {error.message}</div>
    );
  }
  console.log(data);
  return (
    <div>
      <ul>
        {data?.categories.map((category: any) => (
          <li key={category.categoryId}>
            {category.categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardPage;
