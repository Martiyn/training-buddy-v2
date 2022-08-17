import { CommentStatus } from "./comments-model";
import { FilterListener } from "./shared-types";
import './CommentsFilter.css'

export type FilterType = CommentStatus | undefined;

interface CommentFilterProps {
  filter: FilterType;
  onFilterChange: FilterListener;
}

export function CommentsFilter({
  filter,
  onFilterChange,
}: CommentFilterProps) {
    function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
        onFilterChange(event.target.value === '0' ? undefined : parseInt(event.target.value))
    }
    return (
        <select value={filter} onChange={handleFilterChange} className="CommentsFilter">
            <option value='0'>All</option>
            <option value={CommentStatus.Active}>Active</option>
            <option value={CommentStatus.Suspended}>Suspended</option>
        </select>
    )
}
