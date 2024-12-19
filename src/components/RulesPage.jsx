import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const PageContainer = styled.div`
  padding: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-size: 0.95rem;
`

const Section = styled.section`
  margin-bottom: 2.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const H1 = styled.h1`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
`

const H2 = styled.h2`
  font-size: 1.35rem;
  margin: 1.5rem 0 1rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
`

const H3 = styled.h3`
  font-size: 1.1rem;
  margin: 1.25rem 0 0.75rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
`

const P = styled.p`
  margin: 0.75rem 0;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
`

const List = styled.ul`
  margin: 0.75rem 0;
  padding-left: 1.5rem;
  
  li {
    margin: 0.5rem 0;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.95rem;
  }

  ul {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1.25rem 0;
  font-size: 0.9rem;
  
  th, td {
    padding: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    text-align: left;
  }
  
  th {
    background: rgba(255, 255, 255, 0.03);
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
  }
  
  td {
    color: rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
`

// Add a subtle link style
const Link = styled.a`
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.6);
  }
`

export const RulesPage = () => {
  return (
    <PageContainer>
      <Content>
        <H1>FiesTA Recruitment Awards Rules and Guidelines</H1>
        <P>The FiesTA Recruitment Awards celebrate excellence in recruitment, talent acquisition, and leadership. This page outlines the rules for nominations, voting, and scoring to ensure transparency and fairness.</P>
        
        <Section>
          <H2>Award Categories</H2>
          <List>
            <li>
              <H3>Best Tech Recruiter</H3>
              <P>For outstanding achievements in hiring top technical talent.</P>
            </li>
            <li>
              <H3>Best GTM/Business Recruiter</H3>
              <P>Recognizing excellence in hiring for sales, marketing, and other GTM (Go-to-Market) roles.</P>
            </li>
            <li>
              <H3>Best Leadership Recruiter</H3>
              <P>Honoring recruiters specializing in senior leadership roles (VP, CXO).</P>
            </li>
            <li>
              <H3>Top TA Leader</H3>
              <P>Celebrating visionary leaders driving innovation, efficiency, and team success in talent acquisition.</P>
            </li>
            <li>
              <H3>Best Candidate Experience Specialist</H3>
              <P>For professionals delivering exceptional candidate experiences, improving satisfaction scores, and reducing drop-offs.</P>
            </li>
            <li>
              <H3>Best Employer Branding Champion</H3>
              <P>Recognizing impactful employer branding campaigns that attract top talent and enhance brand reputation.</P>
            </li>
            <li>
              <H3>Best DEI Advocate</H3>
              <P>Celebrating champions of diversity, equity, and inclusion in recruitment, driving initiatives that foster inclusive hiring practices.</P>
            </li>
            <li>
              <H3>Best Referral Champion</H3>
              <P>Honoring individuals driving successful referral programs with measurable hiring and retention results.</P>
            </li>
            <li>
              <H3>Lifetime Achievement Award</H3>
              <P>Recognizing a career of exceptional contributions to recruitment and talent acquisition.</P>
            </li>
          </List>
        </Section>

        <Section>
          <H2>Eligibility Rules</H2>
          <H3>Nomination Criteria</H3>
          <List>
            <li>
              <strong>Who Can Nominate?</strong>
              <P>Anyone can nominate themselves or others, provided the nominee has worked in the relevant category within the last 12 months (except for the Lifetime Achievement Award).</P>
            </li>
            <li>
              <strong>Nominee Eligibility</strong>
              <P>Nominees must demonstrate measurable success in recruitment, talent acquisition, or related fields in alignment with the selected category.</P>
            </li>
            <li>
              <strong>Lifetime Achievement Award</strong>
              <P>This category is for individuals with a minimum of 15 years of experience and a significant impact on the recruitment industry.</P>
            </li>
            <li>
              <strong>Timeframe of Achievements</strong>
              <P>Nominations (except for Lifetime Achievement) must focus on results and contributions from the last 12 months.</P>
            </li>
            <li>
              <strong>One Category Per Nomination</strong>
              <P>A nominee can only be nominated for one category at a time. However, the same individual can be nominated in multiple categories with separate forms.</P>
            </li>
            <li>
              <strong>Accurate Data</strong>
              <P>All submitted data must be verifiable. Misrepresentation may result in disqualification.</P>
            </li>
          </List>
        </Section>

        <Section>
          <H2>Voting Process</H2>
          <P>The FiesTA Recruitment Awards follow a hybrid voting system, combining jury points and community votes to determine winners.</P>
          
          <H3>Jury Voting</H3>
          <List>
            <li>Each category is evaluated by a panel of industry experts.</li>
            <li>Each jury member has 50 points to allocate to any nominee they consider deserving of the category.</li>
            <li>Jury evaluations focus on:
              <ul>
                <li>Measurable metrics and achievements.</li>
                <li>Innovation and creativity in the nominee's approach.</li>
                <li>Overall impact on the organization and recruitment community.</li>
              </ul>
            </li>
          </List>

          <H3>Community Voting</H3>
          <List>
            <li>Each community upvote is worth 1 point.</li>
            <li>Votes can be cast by registered users, with one vote per nominee per category.</li>
            <li>The leaderboard displays real-time community votes.</li>
          </List>
        </Section>

        <Section>
          <H2>Scoring Formula</H2>
          <P>The final score is calculated using a weighted formula that balances jury votes and community upvotes.</P>
          
          <H3>Formula</H3>
          <P>Total Score = (Jury Points × 50) + (Unique Upvotes × W)</P>
          
          <H3>Weight Factor (W)</H3>
          <P>The weight factor adjusts the influence of community votes:</P>
          <List>
            <li>Low W (1–5): Prioritizes jury votes</li>
            <li>Medium W (10–20): Balances jury and community votes</li>
            <li>High W (25–50): Gives significant weight to public votes</li>
          </List>
          <P>For FiesTA Recruitment Awards, W = 10 (balanced)</P>

          <H3>Example Calculation</H3>
          <Table>
            <thead>
              <tr>
                <th>Nominee</th>
                <th>Jury Points</th>
                <th>Community Upvotes</th>
                <th>Total Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nominee A</td>
                <td>5</td>
                <td>100</td>
                <td>(5 × 50) + (100 × 10) = 750</td>
              </tr>
              <tr>
                <td>Nominee B</td>
                <td>6</td>
                <td>50</td>
                <td>(6 × 50) + (50 × 10) = 800</td>
              </tr>
              <tr>
                <td>Nominee C</td>
                <td>3</td>
                <td>200</td>
                <td>(3 × 50) + (200 × 10) = 1250</td>
              </tr>
            </tbody>
          </Table>
        </Section>

        <Section>
          <H2>FAQ</H2>
          <H3>General</H3>
          <P><strong>Q: What are the FiesTA Recruitment Awards?</strong></P>
          <P>A recognition program celebrating the achievements of recruiters and TA leaders, combining community and jury voting.</P>
          
          <P><strong>Q: Is this the first edition?</strong></P>
          <P>Yes, this is the inaugural edition of the awards.</P>

          <H3>Nominations</H3>
          <P><strong>Q: Who can nominate?</strong></P>
          <P>Anyone can nominate themselves or someone else.</P>
          
          <P><strong>Q: Can I nominate myself?</strong></P>
          <P>Yes, self-nominations are encouraged.</P>

          <H3>Timeline</H3>
          <List>
            <li><strong>Nominations Open:</strong> Monday, 23 December 2025 at 11:00 AM (IST)</li>
            <li><strong>Voting Ends:</strong> Wednesday, 15 January 2025 at 11:59 PM (IST)</li>
            <li><strong>Winners Announced:</strong> Friday, 24 January 2025</li>
          </List>
        </Section>

        <Section>
          <H2>Contact Support</H2>
          <P>For further assistance, contact us at <Link href="mailto:we@recfiesta.com">we@recfiesta.com</Link></P>
        </Section>
      </Content>
    </PageContainer>
  );
}; 