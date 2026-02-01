<?php

namespace App\Http\Controllers\Dashboard;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return inertia::render('Dashboard/Index');
    }

}
