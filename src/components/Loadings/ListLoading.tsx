import { classNames } from "utils/functions";

 function ListLoading({loading, numCols}){
    const rows = []
    const cols = []

    for(var j = 0; j < numCols-1; j++){
        cols.push(
        <td className="p-4">
            <div className="h-4 rounded-md bg-gray-500"></div>
        </td>
        )
    }

    for (var i = 0; i < 5; i++) {
        rows.push(

    <tr className="px-4 animate-pulse">
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-500">
            </div>
            <div className="w-full h-full flex flex-col gap-2 pl-2">
            <div className="h-3 w-full rounded-md bg-gray-500"></div>
            <div className="h-3 w-full rounded-md bg-gray-500"></div>
            </div>
          </div>
        </td>
        
        {cols}
    </tr>

    );
    }
    return (
            <tbody  className={classNames(
                !loading?'hidden':'',
                "bg-white divide-y divide-gray-200"
            )} >
            {rows}
            </tbody>    
    )
}

export default ListLoading;