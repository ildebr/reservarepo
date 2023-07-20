import { useState, useEffect } from "react"
import "./Paginate.scss"
const PAGE_LIMIT = 3;
export const Paginate = ({
    page,
    hasPrevPage,
    hasNextPage,
    // prevPage,
    // nextPage,
    onNextClick,
    onPrevClick,
    totalPages,
    onPageClick
}) => {

    const [startRenderPage, setStartRenderPage] = useState(1);
    const [totalPagesToRender, setTotalPagesToRender] = useState(0);
    useEffect(() => {
        if (totalPages > PAGE_LIMIT) {
          setTotalPagesToRender(PAGE_LIMIT);
        } else if(totalPages < PAGE_LIMIT) {
          setTotalPagesToRender(totalPages);
        }
      }, [totalPages])
    
      useEffect(() => {
        if (totalPages < PAGE_LIMIT) return;
        if (Math.ceil(page / PAGE_LIMIT) > 1) {
          let nextRageOfPages = (Math.ceil(page / PAGE_LIMIT) * PAGE_LIMIT);
          if (nextRageOfPages > totalPages) {
            nextRageOfPages = totalPages;
          }
          setStartRenderPage((PAGE_LIMIT * (Math.ceil(page / PAGE_LIMIT) -1 )) + 1);
          setTotalPagesToRender(nextRageOfPages);
        } else {
          setStartRenderPage(1);
          setTotalPagesToRender(PAGE_LIMIT);
        }

        // console.log(startRenderPage)
        // console.log(totalPagesToRender)
      }, [page])
      // console.log(startRenderPage)
      //   console.log(totalPagesToRender)


    const Pages = () => {
        let li = []
        for (var i = startRenderPage; i <= totalPagesToRender; i++){
            let pageCounter = i;
            li.push(
            <li key={i} 
            className={pageCounter === page ? 'page-item active' : 'page-item'}
            onClick={() => onPageClick(pageCounter)}
            >
                <a>{pageCounter}</a>
            </li>)
        }
        return li
    }
    return <>
        
        <div className="paginator-container">
            <div className="page-items">
                {hasPrevPage ? 
                <li className={!hasPrevPage ? 'page-item disabled' : 'page-item'}
                onClick={onPrevClick}
                >
                    {hasPrevPage ? <p>{'<'}</p> : <></>}
                </li> 
                :
                <></>
                }
                <Pages />
                {hasNextPage ? 
                <li className={!hasNextPage ? 'page-item disabled' : 'page-item'} 
                onClick={onNextClick}
                > 
                    {hasNextPage ? <p>{'>'}</p> : <>  </>}
                </li> 
                :
                <></>}
            </div>
        </div>
        
    </>
}