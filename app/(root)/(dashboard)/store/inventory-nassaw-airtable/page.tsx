import { Card, Table, TableRow, TableCell, TableHead, TableHeaderCell, TableBody } from "@tremor/react";
import Link from "next/link";
import api from "../../../../../api";
import type { VehicleRecord } from '@/types/api';

async function showVehicles() {
    // State for modal
    const vehicles: VehicleRecord[] = await api.list();
  
    return (
      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Preview</TableHeaderCell>
              <TableHeaderCell>Link</TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              {/* Add more headers based on your VehicleRecord type */}
            </TableRow>
          </TableHead>
  
          <TableBody>
            {vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>{vehicle.fields.Notes}</TableCell>
                  <TableCell>
                    {/* Use Next.js Link for client-side navigation */}
                    <Link href={`https://example.com/vehicles/${vehicle.id}`} passHref>
                      <a target="_blank">Details</a>
                    </Link>
                  </TableCell>
                  <TableCell>{vehicle.fields.Name}</TableCell>
                  {/* Add more cells based on your VehicleRecord type */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No vehicles found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    );
  }
  
  export default showVehicles;