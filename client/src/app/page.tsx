import Dashboard from "@/app/dashboard/page";   // remeber @ refers to source directory, then we go to app directory within the source , from app we go to folder called dashboard and within dashboard we have a file called page  (helps us not need to use the concept of relative path which would be very tedious)

//Note i have actually created the dashboard folder , it did not exist before 
//NOTE THAT THERE ARE TWO PAGES CALLED page.tsx , THIS ONE WHICH IS IN THE SOURCE DIRECTORY DIRECTLY AND THE OTHER ONE that is in the dashboard directory ( both of which we created)


export default function Home() {
  return (
    <Dashboard />
  );
}
