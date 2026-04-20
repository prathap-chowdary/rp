const cats = ["All","Story & fit","Technical depth","Salary & logistics","Mindset & growth"];
const qs = [
{
    cat:"Story & fit",
    q:"Tell me about yourself.",
     answer:`Sure ! Thanks for giving this opportunity. I’m Prathap, working as an Azure Data Engineer at TCS with around 3 years of experience in building and optimizing enterprise data pipelines. My core stack includes Azure Databricks, ADF, PySpark, Python, and SQL. I’ve been working on a US-based healthcare client project. I completed my B.Tech in Electronics and Communication Engineering from VR Siddhartha Engineering College, Vijayawada.
    I also hold both the Databricks Certified Data Engineer Associate and Professional certifications`,
              children:[
              {
                q:"Why ECE to Data Engineering?",
                a:"Although I studied ECE, I developed a strong interest in data and software during my college and started learning Python and SQL. That interest turned into hands-on experience in my current role with Databricks and PySpark, so I chose to build my career in data engineering",
                children:[]
              },
            ]
},
//new
 {
    cat:"Story & fit",
    q:"Why are you looking for a new role right now? / leaving TCS",
    answer:`"👉TCS gave me a strong foundation in building production-grade data pipelines on Azure Databricks and understanding how large-scale healthcare data systems operate end to end.
    👉 My role has mainly focused on enhancing & optimizing existing systems, and I’m now looking for opportunities where I can contribute more to design decisions and grow in building scalable data systems`
    ,
children:[
    {
        q:"what optimizations",
        a:"👉 In our pipelines, I mainly worked on reducing job runtime . For example, one of our joins between large claim tables was causing heavy shuffle. I optimized it using broadcast join for smaller dimension tables and repartitioned data based on join keys. This reduced runtime by around 30–40%.",
       children: [
                       {
                            q:`how you identifiedbottle necks`,
                            a:`“I identified the bottleneck using Spark UI — stages with high shuffle read and skewed tasks."`,
                            children:[]
                       },
               ],
    } ,
    {
        q:`what design decisions are you ref to`,
        a:`👉“Primarily around structuring pipelines — deciding how to split transformations across bronze, silver, and gold, choosing incremental vs full loads, and partitioning strategies for large tables.”
            👉 If pushed:“For example, for frequently updated healthcare claims data, we used incremental loads with merge instead of full refresh to reduce processing time.”`,
        children:[],
    },
    {
        q:`what makes systems scabale`,
        a:`Scalability depends on handling increasing data without performance degradation. In our case, we ensured scalability using partitioning on high-cardinality columns, incremental processing instead of full loads, and avoiding data skew during joins.`,
        children:[],
    },
    {
        q:`How do you ensure data quality?`,
        a:`In silver layer, we apply checks like removing duplicates, handling null values, and validating schema. We also compare record counts between source and target. For critical tables, we added validation queries to ensure consistency before loading into gold.`,
        children:[],
    },
    {
        q:`Handling large data volumes?`,
        a:`For large datasets, we use partitioning and avoid small file issues by optimizing file sizes. We also use Delta format for efficient reads and writes. During joins, we handle skew using repartitioning or broadcast where applicable`,
        children:[],
    },
    {
        q:`how do you handle failures`,
        a:`“We use retry mechanisms in our job orchestration. Also, since we use incremental loads with merge, pipelines are idempotent — rerunning doesn’t create duplicates. We also log failures and track them for debugging.”`,
        children:[],
    },
    {
        q:`How do you optimize cost in Databricks?`,
        a:`We optimized cost by using job clusters instead of all-purpose clusters, enabling auto-scaling, and avoiding unnecessary full data processing. Also, by optimizing queries and reducing shuffle, we reduced compute usage.`,
        children:[],
    },
    {
        q:`How do you ensure data quality?`,
        a:`yes`,
        children:[],
    }
   ] 
       
},
// new 
  {
    cat:"Story & fit",
    q:"Walk me through your current project.",
    answer:`"I’m currently working on a US-based healthcare client project where I handle end-to-end data pipelines processing around 30–40 GB of data daily from multiple upstream sources, including an on-premise PostgreSQL database and file-based inputs like CSV and Excel.\n

The main challenge was dealing with inconsistent data formats, maintaining data quality, and enabling reliable downstream analytics. To solve this, I worked on building a scalable pipeline using Medallion Architecture.\n

In the Bronze layer, I implemented incremental ingestion to efficiently bring in raw data and store it in Parquet format, while standardizing column structures across different sources.\n

In the Silver layer, I focused on data quality by implementing deduplication, null handling, schema enforcement, and validation rules. This ensured only clean and consistent data moves forward. We stored this in Delta tables using a truncate-and-load approach for staging.\n

In the Gold layer, I built business transformations and implemented SCD Type 2 logic using merge operations to maintain historical data. I also added audit columns like timestamps and run IDs for better traceability and debugging.\n

For downstream consumption, we integrated with Snowflake using Azure Data Factory pipelines to push data incrementally. On top of Snowflake, we created optimized views used by reporting and analytics teams.\n

The pipelines are orchestrated using scheduled workflows running every 4 hours.

One key contribution I made was improving incremental load efficiency and strengthening data validation checks, which helped reduce data inconsistencies and improved overall pipeline reliability.

Overall, this system ensures scalable, reliable, and hgh availability for critical healthcare analytics.”"`,
children:[]
  },
  {
    cat:"Story & fit",
    q:"What's your biggest technical achievement so far?",
    answer:`"The pipeline optimization work. When I joined the project the Spark jobs were running long and there was a lot of full-reload processing. I profiled the bottlenecks, introduced dynamic partitioning, added caching for reused DataFrames, and compacted small files that were killing read performance. The result was a 40 to 45 percent reduction in runtime. It was meaningful because it didn't just make the jobs faster — it reduced infrastructure cost and improved our data availability window for the BI team."`,children:[]
  },
  {
    cat:"Technical depth",
    q:"What Azure and Databricks tools do you use daily?",
    answer:`"Day to day: Databricks for compute and notebook-based pipeline development, PySpark for distributed transformations, Delta Lake for the storage layer, ADLS Gen2 for raw and processed data storage, and Azure Data Factory for orchestration and triggering pipelines. Git for version control across the team. I use SQL heavily inside Databricks for the Gold-layer aggregations."`,children:[]
 
  },
  {
    cat:"Technical depth",
    q:"Can you explain Medallion architecture in plain terms?",
    answer:`"It's a layered approach to organizing data in a lakehouse. Bronze is the raw landing zone — data arrives exactly as the source sent it, no transformations, just durability. Silver is where you clean, validate, join, and conform the data — it's the trusted, queryable layer. Gold is business-level aggregates and domain models that BI tools and analysts consume directly. The big benefit is clear lineage, easy debugging — if something's wrong in Gold you trace it back through Silver to Bronze — and separating storage concerns from compute."`,
 children:[]  
  },
  {
    cat:"Technical depth",
    q:"What is Delta Lake and why does it matter?",
    answer:`"Delta Lake is an open-source storage layer that brings ACID transactions to your data lake. Without it, a data lake is just files — no guarantees around consistency if a write fails halfway. With Delta Lake you get reliable MERGE and upsert operations, schema enforcement, schema evolution when your source data changes, and Time Travel which lets you query historical versions of a table. In practice it means I can build incremental pipelines that are safe to rerun without duplicating data, which is critical in healthcare where data accuracy matters."`,
 children:[]  
  
  },
  {
    cat:"Technical depth",
    q:"How do you handle incremental data loads?",
    answer:`"I use Delta Lake MERGE statements combined with a watermark pattern. Typically I track a high-water mark column — like a last_modified timestamp — to pull only changed or new records from the source. Then I MERGE them into the target Delta table: update if the key exists, insert if it's new. For some tables I also use CDC patterns depending on what the source system supports. The goal is always to avoid full reloads — at 45 to 50 GB per day, full reloads aren't cost-effective or time-efficient."`,
 children:[]  
  },
  {
    cat:"Technical depth",
    q:"How did you optimize Spark job performance?",
    answer:`"A few different levers. First, partitioning — partitioning data by a high-cardinality date or region column reduces the shuffle and limits how much each task reads. Second, caching — any DataFrame that gets reused in the same pipeline I persist to memory rather than recomputing it. Third, file compaction — small files are a major Spark performance killer, so I run OPTIMIZE on Delta tables regularly to consolidate them. Z-ORDER on top of that clusters physically related data to cut read I/O. Combined, these brought our job runtimes down 40 to 45 percent."`,
 children:[]  
  },
  {
    cat:"Salary & logistics",
    q:"What's your current CTC and what are your expectations?",
    answer:`Research the market rate before the call. For a Databricks / Azure Data Engineer with 2–3 years in Hyderabad, the range in 2025–2026 is roughly ₹8–14 LPA depending on company size. Give a range, not a single number. Example: "I'm currently at X. Based on my research and the scope of this role, I'm targeting somewhere in the Y to Z range — but I'm open to discussing the full compensation picture."`,
 children:[]  
  },
  {
    cat:"Salary & logistics",
    q:"What's your notice period?",
    answer:`"My official notice period is [your actual period — typically 60–90 days at TCS]. I'd want to ensure a proper handover of my pipelines, but I'm open to discussing early joining if the situation allows."`,
 children:[]  
  },
  {
    cat:"Salary & logistics",
    q:"Are you open to relocation / hybrid / remote?",
    answer:`Answer honestly based on your actual preference. Just be specific — "I'm open to hybrid in Hyderabad or Bangalore" is more useful to a recruiter than "I'm flexible."`,
 children:[]  
  },
  {
    cat:"Mindset & growth",
    q:"You have under 3 years of experience — how do you position yourself for senior roles?",
    answer:`"I'd position it differently — I have under 3 years of time, but I have production experience at scale. I've optimized pipelines processing 45 to 50 GB per day, designed full Medallion architectures, and I hold both Databricks certifications — Associate and Professional. The Professional certification in particular is not a beginner credential. I'm not claiming to have a decade of architecture experience, but I'm technically deeper than my tenure suggests."`,
 children:[]  
 
  },
  {
    cat:"Mindset & growth",
    q:"What are you looking to learn or work on next?",
    answer:`"I want to go deeper on real-time streaming — I've only worked in batch so far and I want to get hands-on with Spark Structured Streaming or Delta Live Tables. I'm also interested in data quality frameworks and working closer to the platform side — infrastructure-as-code, cluster tuning at a deeper level. And eventually data architecture ownership — not just building pipelines but designing the systems they run on."`,
 children:[]  
  }
];
