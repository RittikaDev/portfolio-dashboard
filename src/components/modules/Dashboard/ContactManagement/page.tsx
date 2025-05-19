/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import envConfig from "@/config/env.config";
import LoadingPage from "@/app/loading";
import { useGetMeQuery } from "@/redux/features/authApi";

type ContactProps = {
  token: string;
};

const ContactManagement = ({ token }: ContactProps) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { data: me, isLoading, error } = useGetMeQuery();
  console.log({ me, isLoading, error });

  useEffect(() => {
    // console.log(token);
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          // "https://portfolio-v2-alpha-woad.vercel.app/api/contact",
          `${envConfig.baseApi}/api/contact`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );
        const { data } = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="l font-semibold">Messages</h1>
      </div>

      {/* DISPLAY MESSAGES TABLE */}
      {loading ? (
        <LoadingPage />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Name</TableHead>
              <TableHead>User Email</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message._id}>
                <TableCell>{message.userName}</TableCell>
                <TableCell>{message.userEmail}</TableCell>
                <TableCell>{message.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ContactManagement;
