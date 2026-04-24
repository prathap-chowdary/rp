const cats = ["All","Story & fit","Technical depth","Salary & logistics","Mindset & growth","Project"];
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
    cat:"Project",
    q:"Walk me through your current project.",
    answer:`<li> I'm currently in the US healthcare domain where I build and optimize data pipelines on Azure Databricks.</li>
    <li>We follow Medallion architecture — Bronze, Silver, and Gold — to ensure clean separation between raw ingestion, transformation, and business-ready data.</li>
    <li>Our primary sources include an on-prem PostgreSQL database and file-based inputs like CSV and excel. </li>
    <li>In the Bronze layer, we follow an incremental load pattern — we maintain a metadata table that tracks the last_processed_timestamp per table. On each run, we query only the delta records beyond that watermark, and All raw data lands in the Bronze layer in Parquet format on ADLS Gen2 — minimal transformations here, just schema alignment across sources.</li>
   <ul><li>In the silver layer We pick up today's incremental records from Bronze, apply transformations, truncate Silver, and reload it — making every run idempotent.</li>
   <li>For transformations, we do three things: deduplication using ROW_NUMBER() partitioned by the business key and ordered by updated_at descending to retain only the latest version of each record, null handling where we drop nulls on critical columns and default-fill the rest, and normalization to standardize data types, date formats, and column casing across sources.</li>
   <li>Silver Data is stored in Delta format to ensure consistency and support downstream transformations</li>
   </ul>
   <ul><li>Gold is where business logic lives. For dimension tables, we implement SCD Type 2 using MERGE — inserting new records and closing out old ones with an end date and active flag, so we preserve the full history of how an entity changed over time.</li> <li>For fact tabbles, we apply aggregations aligned to reporting requirements.</li>
<li>All Gold tables are stored in Delta format.</li></ul>
	<li>BI and reporting teams consume Gold through views built on top of Delta tables, giving them a clean, always-current interface without touching raw tables. </li>
	<li>Data science teams work directly on the Delta tables, primarily because they need time travel — querying specific historical versions for model training</li>
	<li>The entire pipeline — Bronze to Silver to Gold — is orchestrated through Databricks Workflows, running on a scheduled cadence and processing around 45–50 GB daily end to end</li>`

,children:[
{
	q:`High Level`,
	a:``,
	children:[
			{ q:`Why medallion `,
					a:` <ul>
  		<li>In our project, Medallion architecture helped solve data inconsistency and reprocessing issues from multiple sources (PostgreSQL + files).
    		<ul>
      			<li>Bronze stores raw data as-is from source→ so you always have a replayable source of truth if anything breaks downstream.</li>
      			<li>Silver ensures standardized, deduplicated datasets, avoiding repeated cleaning logic across teams</li>
      			<li>Gold provides business-ready, aggregated datasets, so BI and DS teams don’t implement their own transformations</li>
    		</ul>
  		</li><li>Without medallion, debugging and root-cause tracing were difficult, and reprocessing required repeatedly hitting source systems, increasing cost and risk.</li></ul>`,
			children:[],
			} ,
			

			{q:`Why Databricks for just 45–50 GB/day, not rdbms or Snowflake ingestion`,
			 a:` 👉Current volume is moderate, but we chose Databricks for scalability, complex transformations like SCD2, and Delta features like MERGE and time travel.
			It’s more about future growth and flexibility than just current size.<br>
			👉If migrated now : At current scale, a traditional system could work but slow due to scd2+ complex joins, but Databricks gives us better flexibility and future 				scalability. `,
			 children:[] ,
			},
			{
			q:`On premis sql - How pulling - What’s the failure handling mechanism?`,
			a:` <li> We ingest data from on-prem PostgreSQL using JDBC-based Spark reads via Databricks.</li>
				<li>We use partitioned JDBC reads (based on numeric columns like ID) to parallelize extraction and improve performance.If not used  everything 					through a single executor. </li>
				<li>We have retry logic (3 attempts) for transient failures like network issues.
				</li> <li>The pipelines are orchestrated via Databricks Workflows.</li> 
					<pre><code class="language-python">url = "jdbc:postgresql://host:port/db"
properties = {
    "user": "username",
    "password": "password",
    "driver": "org.postgresql.Driver"
}
query = "(SELECT * FROM schema.table WHERE updated_at > '2025-01-01') as t"
retries = 3
for i in range(retries):
    try:
        df = spark.read.jdbc(
            url=url,
            table=query,
            properties=properties
        ).option("partitionColumn", "id")
         .option("lowerBound", "1")
         .option("upperBound", "100000")
         .option("numPartitions", "8")
         .load()
 
        break
    except Exception as e:
        if i == retries - 1:
            raise e</code></pre>`,
			children:[],
			},
		],
},
///new

{
q:`Bronze Layer`,
	a:``,
	children:[
		{
		q:`How do you ensure atomicity between data load + watermark update? and how it loads`,
		a:`<li>Metadata table (stored as Delta) tracks last_processed_timestamp.</li><li>We update it only after successful data write to Bronze.</li><li>This ensures if pipeline fails mid-way, watermark is not updated → so data is reprocessed safely.</li>`,children:[],
},
		{
		q:`Why Parquet in Bronze, not Delta?`,
		a:`<li>Bronze is meant to store raw, immutable data, so we use Parquet to keep it simple and cost-efficient.
</li><li>We avoid Delta here since we don’t need updates or ACID — just raw ingestion.
</li><li>Delta is used from Silver onwards where we need MERGE, updates, and consistency.</li>`,children:[],
},
 

//////////////////////////

{ q:`Late arriving data`,
a:`<li>Currently, we rely on source data contracts, so we don’t have a dedicated late-data handling mechanism.</li>
	<li>I’m aware this is a limitation, since timestamp-based incremental loads can miss late-arriving records.</li>
	<li>A better approach would be implementing a lookback window or CDC-based ingestion to handle such scenarios more reliably.</li>`
,children:[
{q:`how look back windows are decided`,
	a:`<li>Lookback window is decided based on data arrival patterns and business SLAs.</li><li>We analyze how late data typically arrives (e.g., 1–2 days delay), and set the window 	slightly higher (like 2–3 days) to be safe.</li>`
,children:[],
},],},],},
//////////////////////////////////


//new
{q:`Silver Layer`,
	a:``,
	children:[
		{
		q:`How do you ensure atomicity between data load + watermark update? and how it loads`,
		a:`<li></li><li></li><li></li>`,children:[],
		},
]
 },
///new
{q:`Gold Layer`,
	a:``,
	children:[{	
		q:`How do you ensure atomicity between data load + watermark update? and how it loads`,
		a:`<li></li><li></li><li></li>`,children:[],
},]
},
///new
{q:`🔥 Performance & Optimization (this is where your “40–45%” claim gets tested)`,
	a:``,
	children:[]
},
{q:`🔥 Architecture & Reality Check`,
	a:``,
	children:[]
}
],
  },
//////////___________________new //////////////////////////
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
