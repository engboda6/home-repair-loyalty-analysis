import {
  BarChart,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  LineChart,
  PieChart,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
} from "cursor/canvas";

const MONTHLY = {
  categories: ["Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024"],
  revenue: [386434, 400483, 382006, 388601],
  returningPct: [48.4, 47.1, 50.3, 51.8],
  roas: [3.01, 3.12, 2.94, 3.02],
};

export default function HomeRepairLoyalty() {
  return (
    <Stack gap={24}>
      <Stack gap={8}>
        <H1>Home repair loyalty analysis</H1>
        <Text tone="secondary">
          Source: Data.xlsx · 2,000 service records · Jan 1 – Apr 30, 2024
        </Text>
        <Text>Eng:Abd Alrahman Ahmed</Text>
        <Row gap={8} wrap>
          <Pill tone="info">Surveys</Pill>
          <Pill tone="info">Service bundles</Pill>
          <Pill>Customer loyalty</Pill>
        </Row>
      </Stack>

      <Grid columns={4} gap={12}>
        <Stat value="$1.56M" label="Total revenue" />
        <Stat value="$515K" label="Ad spend" />
        <Stat value="3.02x" label="Overall ROAS" tone="success" />
        <Stat value="49.4%" label="Returning customers" />
      </Grid>

      <Divider />

      <Stack gap={12}>
        <H2>Database snapshot</H2>
        <Text tone="secondary">
          Flat marketing table — one row per campaign/service observation. No
          customer IDs, NPS, or bundle flags yet; loyalty is inferred from
          Customer Type.
        </Text>
        <Table
          headers={[
            "Column",
            "Role",
            "Values / notes",
          ]}
          rows={[
            ["Date", "Time", "2024-01-01 → 2024-04-30"],
            ["Revenue", "Outcome ($)", "Avg ~$779 per record"],
            ["Ad Spend", "Cost ($)", "Total $514,908"],
            ["Conversions", "Volume", "10,069 total"],
            [
              "Service Type",
              "Offer tier",
              "Standard 668 · Seasonal 651 · Premium 681",
            ],
            ["Customer Type", "Loyalty proxy", "New 1,012 · Returning 988"],
            [
              "Channel",
              "Acquisition",
              "Google · Instagram · Referral · Email",
            ],
            ["Region", "Geo", "North · South · East · West"],
          ]}
        />
      </Stack>

      <Grid columns={2} gap={16}>
        <Card>
          <CardHeader>Customer mix</CardHeader>
          <CardBody>
            <PieChart
              donut
              size={220}
              data={[
                { label: "New", value: 1012, tone: "info" },
                { label: "Returning", value: 988, tone: "success" },
              ]}
            />
            <Text tone="secondary" size="small">
              Nearly even split — loyalty programs can tip the balance.
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Service mix</CardHeader>
          <CardBody>
            <PieChart
              donut
              size={220}
              data={[
                { label: "Standard", value: 668 },
                { label: "Seasonal", value: 651 },
                { label: "Premium", value: 681 },
              ]}
            />
            <Text tone="secondary" size="small">
              Balanced tiers — good base for bundle packaging.
            </Text>
          </CardBody>
        </Card>
      </Grid>

      <Stack gap={12}>
        <H2>Loyalty signal over time</H2>
        <Text tone="secondary">
          Returning share rose from 48.4% in January to 51.8% in April while
          ROAS stayed near 3x.
        </Text>
        <LineChart
          categories={MONTHLY.categories}
          series={[
            {
              name: "Returning customers (%)",
              data: MONTHLY.returningPct,
              tone: "success",
            },
            {
              name: "ROAS (x)",
              data: MONTHLY.roas,
              tone: "info",
            },
          ]}
          beginAtZero={false}
          height={240}
          valueSuffix=""
        />
        <Text tone="secondary" size="small">
          Source: Data.xlsx monthly aggregates · Jan–Apr 2024
        </Text>
      </Stack>

      <Stack gap={12}>
        <H2>Revenue by month</H2>
        <BarChart
          categories={MONTHLY.categories}
          series={[
            {
              name: "Revenue ($)",
              data: MONTHLY.revenue,
              tone: "info",
            },
          ]}
          valuePrefix="$"
          height={220}
        />
        <Text tone="secondary" size="small">
          Source: Data.xlsx · monthly sum of Revenue
        </Text>
      </Stack>

      <Divider />

      <Stack gap={12}>
        <H2>Service tiers vs loyalty</H2>
        <Text tone="secondary">
          Premium returning jobs earn the highest average among Premium
          customers; Standard leads on ticket size overall but trails on
          return rate.
        </Text>
        <Table
          headers={[
            "Service",
            "Records",
            "Revenue",
            "Avg revenue",
            "Returning %",
            "ROAS",
          ]}
          rows={[
            ["Premium", "681", "$523,610", "$769", "50.1%", "3.01x"],
            ["Seasonal", "651", "$500,642", "$769", "49.6%", "3.05x"],
            ["Standard", "668", "$533,271", "$798", "48.5%", "3.01x"],
          ]}
          rowTone={["success", undefined, "warning"]}
        />
        <Grid columns={2} gap={12}>
          <Card>
            <CardHeader trailing={<Pill tone="success" size="sm">Upsell</Pill>}>
              Premium × Returning
            </CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Stat value="$796" label="Avg revenue (returning)" />
                <Text tone="secondary" size="small">
                  vs $742 for Premium × New — strongest loyalty lift inside a
                  tier. Bundle maintenance visits onto Premium jobs.
                </Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing={<Pill tone="warning" size="sm">Risk</Pill>}>
              Standard retention gap
            </CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Stat value="48.5%" label="Returning share" tone="warning" />
                <Text tone="secondary" size="small">
                  Highest average ticket ($798) but lowest return rate. Survey
                  after Standard jobs to find friction before churn.
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      <Stack gap={12}>
        <H2>Channels that feed loyalty</H2>
        <BarChart
          categories={["Google", "Referral", "Email", "Instagram"]}
          series={[
            {
              name: "Revenue ($K)",
              data: [449.3, 383.0, 355.5, 369.7],
              tone: "info",
            },
            {
              name: "Returning %",
              data: [48.2, 49.9, 51.0, 48.8],
              tone: "success",
            },
          ]}
          height={240}
        />
        <Text tone="secondary" size="small">
          Source: Data.xlsx · channel totals · Returning % plotted on same
          scale for comparison (not dollars)
        </Text>
        <Table
          headers={[
            "Channel",
            "Revenue",
            "CPA",
            "ROAS",
            "Returning %",
            "Loyalty note",
          ]}
          rows={[
            [
              "Email",
              "$355K",
              "$52.79",
              "3.00x",
              "51.0%",
              "Best return rate — survey & rebook here",
            ],
            [
              "Referral",
              "$383K",
              "$49.26",
              "3.02x",
              "49.9%",
              "Lowest CPA — reward referrers with bundles",
            ],
            [
              "Google",
              "$449K",
              "$51.56",
              "3.14x",
              "48.2%",
              "Top revenue & ROAS — convert new → return",
            ],
            [
              "Instagram",
              "$370K",
              "$51.12",
              "2.92x",
              "48.8%",
              "Weaker ROAS — use for seasonal promos",
            ],
          ]}
        />
      </Stack>

      <Stack gap={12}>
        <H2>High-loyalty channel × service pairs</H2>
        <Text tone="secondary">
          Best places to pilot bundles and follow-up surveys.
        </Text>
        <Table
          headers={["Pair", "Records", "Returning %", "Avg revenue", "Action"]}
          rows={[
            [
              "Referral × Premium",
              "180",
              "55.6%",
              "$738",
              "Annual Premium care bundle + referral credit",
            ],
            [
              "Email × Seasonal",
              "152",
              "54.6%",
              "$772",
              "Seasonal reminder survey + pre-book discount",
            ],
            [
              "Instagram × Seasonal",
              "155",
              "51.0%",
              "$710",
              "Post-job CSAT → offer Standard upgrade",
            ],
            [
              "Google × Seasonal",
              "185",
              "48.1%",
              "$832",
              "Highest avg ticket — attach multi-visit plan",
            ],
          ]}
          rowTone={["success", "success", undefined, "info"]}
        />
      </Stack>

      <Stack gap={12}>
        <H2>Regions</H2>
        <Grid columns={4} gap={12}>
          <Stat value="51.9%" label="West returning" tone="success" />
          <Stat value="50.5%" label="North returning" />
          <Stat value="48.4%" label="South returning" />
          <Stat value="46.7%" label="East returning" tone="warning" />
        </Grid>
        <Text tone="secondary">
          West leads on loyalty; East has the lowest returning share but solid
          ROAS (3.05x) — prioritize East surveys and win-back offers. South
          posts the highest average revenue ($808).
        </Text>
      </Stack>

      <Divider />

      <Stack gap={12}>
        <H2>Recommended program</H2>
        <Grid columns={2} gap={16}>
          <Card>
            <CardHeader>Post-service surveys</CardHeader>
            <CardBody>
              <Stack gap={8}>
                <H3>When</H3>
                <Text>
                  Within 24 hours of job completion, especially Standard and
                  East-region jobs.
                </Text>
                <H3>What to ask</H3>
                <Text>
                  Satisfaction (1–5), likelihood to rebook, interest in a
                  maintenance bundle, and preferred channel (email already
                  retains best).
                </Text>
                <H3>Close the loop</H3>
                <Text>
                  Scores ≤3 trigger a callback; scores ≥4 get a one-click
                  Seasonal or Premium bundle offer.
                </Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Service bundles</CardHeader>
            <CardBody>
              <Stack gap={8}>
                <H3>Care Plus (Standard → Seasonal)</H3>
                <Text>
                  Two seasonal checkups after a Standard repair — targets the
                  retention gap on the highest-ticket tier.
                </Text>
                <H3>Premium Shield</H3>
                <Text>
                  Annual Premium plan sold to Referral and returning Premium
                  customers (already 55.6% return on Referral × Premium).
                </Text>
                <H3>Seasonal Autopilot</H3>
                <Text>
                  Email reminder + pre-booked Seasonal visit — leans on Email’s
                  51% returning rate.
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      </Stack>
    </Stack>
  );
}
