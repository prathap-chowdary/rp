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
   answer: `
<ul>
  <li>I'm currently in the US healthcare domain where I build and optimize data pipelines on Azure Databricks.</li>
  <li>We follow Medallion architecture — Bronze, Silver, and Gold — to ensure clean separation between raw ingestion, transformation, and business-ready data.</li>
  <li>Our primary sources include an on-prem PostgreSQL database and file-based inputs like CSV and Excel.</li>
  <li>In the Bronze layer, we follow an incremental load pattern — we maintain a metadata table that tracks the last_processed_timestamp per table. On each run, we query only the delta records beyond that watermark. All raw data lands in Bronze in Parquet format on ADLS Gen2 — minimal transformations here, just schema alignment across sources.</li>
  <li>In the Silver layer, we pick up today's incremental records from Bronze, apply transformations, truncate Silver, and reload it — making every run idempotent.
    <ul>
      <li>Deduplication using ROW_NUMBER() partitioned by business key, ordered by updated_at descending.</li>
      <li>Null handling — drop on critical columns, default-fill on non-critical.</li>
      <li>Normalization — standardizing data types, date formats, and column casing across sources.</li>
      <li>Silver is stored in Delta format for consistency and downstream support.</li>
    </ul>
  </li>
  <li>In the Gold layer, business logic lives here.
    <ul>
      <li>Dimension tables use SCD Type 2 via MERGE — closing old records with end date and active flag, inserting new versions.</li>
      <li>Fact tables are upserted first via MERGE, then aggregations are run on top for summary tables.</li>
      <li>All Gold tables are stored in Delta format.</li>
    </ul>
  </li>
  <li>BI and reporting teams consume Gold through views built on top of Delta tables — clean, always-current interface without touching raw tables.</li>
  <li>Data science teams work directly on Delta tables for time travel — querying historical versions for model training.</li>
  <li>The entire pipeline is orchestrated through Databricks Workflows, processing around 45–50 GB daily end to end.</li>
</ul>
`,
children:[
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
		q:`How do you handle schema changes from source?`,
		a:`Delta format gives us schema enforcement at write time, so unexpected schema changes fail loudly rather than silently corrupting Silver. We handle schema evolution explicitly when needed using mergeSchema.`,children:[],
		},
]
 },
///new
{q:`Gold Layer`,
	a:``,
	children:[{	
		q:`why upsert fact tables before aggregating?`,
		a:`Aggregating before upsert risks including stale or duplicate records in the summary. We upsert first so the fact table is in its correct final state, then aggregate — ensuring summary tables always reflect accurate numbers`,children:[],
},
{
q:`How does your SCD Type 2 MERGE work?`,
a:`We implemented SCD Type 2 in the Gold layer using Delta Lake MERGE on business key and active flag. If a match is found and tracked columns change, we expire the existing record by setting is_active = false and updating end_date. New records are inserted directly. <br>
For changed records, we insert a new active version in a second step by identifying records closed in the current run, ensuring full history with continuous business key.<br>


<pre><code class="language-sql">


MERGE INTO gold.dim_patient AS tgt
USING incoming AS src
ON tgt.patient_id = src.patient_id -- Business Keys
AND tgt.is_active = true

-- Match found + at least one tracked column changed → close it
WHEN MATCHED AND (
    tgt.name           <> src.name           OR
    tgt.dob            <> src.dob            OR ........
)
THEN UPDATE SET
    tgt.is_active  = false,
    tgt.end_date   = current_date(),
    tgt.updated_at = current_timestamp()

-- No match → brand new record, straight insert
WHEN NOT MATCHED THEN INSERT (
    patient_id,
    name,
    start_date,
    end_date,
    is_active,
    updated_at
)
VALUES (
    src.patient_id,
    src.name,
    current_date(),
    NULL,
    true,
    current_timestamp()
);


INSERT INTO gold.dim_patient (
    patient_id,
    start_date,
    end_date,
    is_active,
    updated_at
)
SELECT
    src.patient_id,
    current_date()      AS start_date,
    NULL                AS end_date,
    true                AS is_active,
    current_timestamp() AS updated_at
FROM incoming src
INNER JOIN gold.dim_patient tgt
    ON  tgt.patient_id = src.patient_id
    AND tgt.is_active  = false
    AND tgt.end_date   = current_date();  -- only rows closed in THIS run


</code></pre>`


,children:[],
},
{q:`why views only for BI`,a:`Views give us a decoupling layer between the Gold tables and BI consumers. If we restructure or rename anything in the underlying table, we just update the view — BI reports stay untouched and nothing breaks downstream`,children:[]},
{q:`what if the MERGE partially fails for fcts? Are your summary tables now inconsistent with facts`,a:`in case of a MERGE failure the aggregation part is skipped  — the agg task only triggers on success of the MERGE task. So summary tables retain yesterday's data intentionally, not silently. We'd also fire an alert so the BI team knows the data is T-1. Stale but consistent is better than partial aggregations on top of a half-written fact table.`,children:[]},
]

},
///new
{q:`🔥 Performance & Optimization (this is where your “40–45%” claim gets tested)`,
	a:``,
	children:[]
},
{q:`🔥 Architecture & Reality Check`,
	a:``,
	children:[
{q:`why not ADF only dbx`, a:`Our sources — PostgreSQL via JDBC and CSV/Excel from ADLS — are natively handled in PySpark, so ADF added no value. Databricks Workflows already handles our orchestration, so bringing in ADF would've just split observability across two tools for zero gain`,children:[]
}
,
]
}
],
  },
//////////___________________new //////////////////////////

{
    cat:" Scenario Based",
   q:`Your 40-45% optimizaton story / Biggest technical achievement so far`,
answer:`<li> One of the significant challenges I faced was around pipeline performance in the Gold layer. Gold layer is where all the heavy lifting happens — SCD Type 2 MERGEs on dimension tables, upserts on fact tables, and aggregations for summary tables on top of that.
<li>Initially, the Gold layer jobs were running for 50-55 mins and sometimes taking much longer than expected. I opened the Spark UI and started analyzing the execution plans. A few things stood out.</li>
<li><ul>
<li>First, the MERGE operations on dimension and fact tables were doing full table scans — because without Z-ORDER, Delta had no way to skip irrelevant files when looking for matching keys. I applied Z-ORDER on the columns used in MERGE join conditions and common filter predicates, It clusters matching rows together physically, so MERGE reads far fewer files. Once that was in place, Delta's data skipping kicked in and the engine started skipping large portions of the table — MERGEs became significantly faster. </li>
<li>Second, since we run MERGE every day, each run was writing new small Delta files into the Gold tables. Over time this meant aggregation queries were opening hundreds of small files instead of a few large ones. I ran OPTIMIZE periodically to compact those files, which reduced the file count Spark had to open during aggregation scans considerably. </li>
<li>Third — and this is the one I found most impactful in the aggregation queries — we had multiple joins happening between the fact table and several dimension tables. Spark was doing SortMerge joins across all of them, which meant heavy shuffle stages. I went through each joining table and checked their sizes in the Spark UI. One of the reference dimension tables was around 20 MB — just above Spark's default auto-broadcast threshold of 10 MB, so it wasn't getting broadcasted automatically. I explicitly applied a broadcast hint on that table. That eliminated the shuffle stage for that join entirely — the small table was sent to every executor once and the join happened locally. The difference was immediately visible in the execution plan. </li></ul>
<li>The combination of these three — Z-ORDER for data skipping on MERGEs, OPTIMIZE for file compaction on aggregations, and broadcast hint for the small dimension table joins — brought down the overall Gold layer runtime by 40–45% </li>
</li>
<pre><code class="language-sql">
result_df = df_large.join(
    broadcast(df_small),
    on="id",
    how="inner"
) -- Daily in code

OPTIMIZE sales_data ZORDER BY (customer_id,client_id)  -- weekly once
VACUUM sales_data RETAIN 168 HOURS -- scheduled separately with appropriate retention to clean up obsolete files without affecting time travel.
</code></pre>

`,
children:[],
}, 
{
    cat:" Scenario Based",
   q:`Challenges faced and overcome`,
answer:`<li> One challenge we faced was schema changes from the Upstream PostgreSQL source, like new columns being added without notice, which used to break our Bronze-to-Silver pipelines.. Since Bronze was stored in Parquet, these columns were ingested without failure but led to schema drift. In Silver, we explicitly select required columns instead of using select *, so pipelines remain stable. We also detect new columns by comparing schemas during ingestion and trigger alert notifications, allowing us to review and onboard them in a controlled manner.</li>
<li>While reading Excel files from Unity Catalog Volumes, Spark initially threw a File Not Found error. After validating the path and volume access permissions, I realized the issue was actually due to Spark not having a native Excel reader.<br>

By default, Spark supports formats like Parquet, CSV, and JSON, but not Excel. So even though the file existed, Spark couldn't interpret it correctly. <br>

To resolve this, I added the external library com.crealytics:spark-excel_2.12:0.13.5 to the cluster. After that, I was able to successfully read the file using the custom format.</li>`,
children:[],
},  
  {
    cat:"Technical depth",
    q:"What Azure and Databricks tools do you use daily?",
    answer:`"Day to day: Databricks for compute and notebook-based pipeline development, PySpark for distributed transformations, Delta Lake for the storage layer, ADLS Gen2 for raw and processed data storage, and Azure Data Factory for orchestration and triggering pipelines. Git for version control across the team. I use SQL heavily inside Databricks for the Gold-layer aggregations."`,children:[]
 
  },
  {
    cat:"Technical depth",
    q:"What is Delta Lake and why does it matter?",
    answer:`"Delta Lake is an open-source storage layer that brings ACID transactions to your data lake. Without it, a data lake is just files — no guarantees around consistency if a write fails halfway. With Delta Lake you get reliable MERGE and upsert operations, schema enforcement, schema evolution when your source data changes, and Time Travel which lets you query historical versions of a table. In practice it means I can build incremental pipelines that are safe to rerun without duplicating data, which is critical in healthcare where data accuracy matters."`,
 children:[]  
  
  },
  {
    cat:"Technical depth",
    q:"How did you optimize Spark job performance?",
    answer:`"A few different levers. First, partitioning — partitioning data by a high-cardinality date or region column reduces the shuffle and limits how much each task reads. Second, caching — any DataFrame that gets reused in the same pipeline I persist to memory rather than recomputing it. Third, file compaction — small files are a major Spark performance killer, so I run OPTIMIZE on Delta tables regularly to consolidate them. Z-ORDER on top of that clusters physically related data to cut read I/O. Combined, these brought our job runtimes down 40 to 45 percent."`,
 children:[]  
  },
  {
    cat:"Mindset & growth",
    q:"What are you looking to learn or work on next?",
    answer:`"I want to go deeper on real-time streaming — I've only worked in batch so far and I want to get hands-on with Spark Structured Streaming or Delta Live Tables. I'm also interested in data quality frameworks and working closer to the platform side — infrastructure-as-code, cluster tuning at a deeper level. And eventually data architecture ownership — not just building pipelines but designing the systems they run on."`,
 children:[]  
  }
];
