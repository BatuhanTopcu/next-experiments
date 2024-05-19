"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";

import { UserResource } from "@/db/schemas";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { deleteUserResource } from "../actions";

type ResourceCardProps = {
  resource: UserResource;
};

export const ResourceCard = ({ resource }: ResourceCardProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const deleteResource = async () => {
    await deleteUserResource({ id: resource.id });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between gap-2">
          <Input
            disabled={!isEdit}
            className="ease w-full px-2 text-xl font-bold transition-all duration-150 disabled:cursor-text disabled:border-neutral-950 disabled:px-0 disabled:text-white disabled:opacity-100"
            value={!isEdit ? resource.name : undefined}
          />
          <Button
            variant="ghost"
            size="sm"
            className="aspect-square h-max min-h-0 px-1 text-red-300 hover:text-red-500 active:text-red-500"
            onClick={deleteResource}
          >
            <Trash2 size="20" />
          </Button>
        </CardTitle>
        <CardDescription className="truncate">{resource.id}</CardDescription>
      </CardHeader>
    </Card>
  );
};
