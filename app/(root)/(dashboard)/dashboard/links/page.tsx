import { Card, Table, TableRow, TableCell, TableHead, TableHeaderCell, TableBody } from "@tremor/react";
import Link from "next/link";
import { getLinks } from "@/actions/link";

async function Links() {
  // State for modal
  const linksData = await getLinks();
  if (!linksData) return <div>            <p>No links found</p> <a href="https://store.unlimitpotential.com/dashboard/images/rec_cmd87sjff3lbs670gk50">Click me</a>
  </div>;


  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Link title</TableHeaderCell>
            <TableHeaderCell>Preview</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>URL</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {linksData.length > 0 ? (
            linksData.map((link) => (
              <TableRow key={link.id}>
                <TableCell>{link.title}</TableCell>
                <TableCell>
                  {/* Use Next.js Link for client-side navigation */}
                  <Link href={`https://workspace.unlimitpotential.com/preview`} passHref>
                    <a target="_blank">Preview</a>
                  </Link>
                </TableCell>
                <TableCell>{link.description}</TableCell>
                <TableCell>{link.image}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>No links found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

export default Links;