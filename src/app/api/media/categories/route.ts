import { NextRequest } from "next/server";
import * as types from "@/types/api/media";
import {
    createClientDB,
    mediaDB,
    mediaGroupsDB,
} from "@/utils/server/db";
import { safeJSON } from "@/utils/server/request";
import { server_config } from "@/utils/server/config";
import { responseJSON } from "@/utils/server/response";

// TODO
