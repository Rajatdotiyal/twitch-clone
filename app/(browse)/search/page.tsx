import { redirect } from "next/navigation"
import { Results, ResultSkeleton } from "./_components/results"
import { Suspense } from "react"


interface SearchPageProps{
   searchParams : Promise< {
    term?: string
   }>
}

export default async function SearchPage({searchParams}:SearchPageProps){
    if(!searchParams){
        redirect("/")
    }

    const {term} = await searchParams;
    return<>
    <div className="h-full p-8 max-w-screen-2xl mx-auto ">
        <Suspense fallback={<ResultSkeleton/>} >
        <Results term={term} />
        </Suspense>
    </div>
    </>
}