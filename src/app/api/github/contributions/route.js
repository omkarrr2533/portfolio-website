import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const username = process.env.GITHUB_USERNAME
    const token    = process.env.GITHUB_TOKEN

    if (!token || !username) {
      return NextResponse.json({ success: false, error: 'GitHub credentials missing' }, { status: 500 })
    }

    const query = `
      query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            totalCommitContributions
            totalPullRequestContributions
            totalIssueContributions
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  color
                }
              }
            }
          }
          repositories(first: 100, ownerAffiliations: OWNER) {
            totalCount
          }
        }
      }
    `

    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables: { login: username } }),
      next: { revalidate: 3600 }, // cache 1 hour
    })

    if (!res.ok) throw new Error(`GitHub GraphQL error: ${res.status}`)

    const { data, errors } = await res.json()
    if (errors) throw new Error(errors[0]?.message || 'GraphQL error')

    const cal = data.user.contributionsCollection.contributionCalendar

    return NextResponse.json({
      success: true,
      data: {
        totalContributions: cal.totalContributions,
        weeks: cal.weeks,
        totalCommits: data.user.contributionsCollection.totalCommitContributions,
        totalPRs: data.user.contributionsCollection.totalPullRequestContributions,
        totalIssues: data.user.contributionsCollection.totalIssueContributions,
      },
    })
  } catch (err) {
    console.error('Contributions API error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'