import classes from './Paginator.module.css';

interface PaginatorProps {
    currentPage: number;
    setPage: (page: number) => void;
    totalPages: number;
}

const Paginator = ({ currentPage, setPage, totalPages }: PaginatorProps) => {
    const pages = Array.from(Array(totalPages).keys()).map(i => i + 1);

    return (
        <div className={classes.pagination}>
            <button onClick={() => setPage(1)}>&laquo;</button>
            {pages.map(p => (
                <button className={p === currentPage ? classes.active : ""} onClick={() => setPage(p)}>
                  {p}
                </button>
            ))}
            <button onClick={() => setPage(totalPages)}>&raquo;</button>
        </div>
    )
}

export default Paginator;