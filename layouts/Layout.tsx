import Head from "next/head"

export const Layout = ({ children }) => {
    
    return (
        <div className="">
              <Head>
              <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet' />
              <script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.1.1/swiper-bundle.min.js" integrity="sha512-xm8JS2jGDMLpY/DrZkEMQecUx4uR7D+6k3+YrVldyuPF9jxqN4SkG0WQ7UjudUgmtL9tbAzfVyRY6hvIERi9HA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <meta name="description" content="Yossef's Home" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link
          href="https://fonts.googleapis.com/css2?family=Sofia&display=swap"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />

        <link
          rel="stylesheet"
          href="https://unpkg.com/swiper/swiper-bundle.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap"
          rel="stylesheet"
        />
        <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
        />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
      </Head>

   
        
<div className=" bg-slate-800">
    
{children}
</div>

      
            </div>
    )
}